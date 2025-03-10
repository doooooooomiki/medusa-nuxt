import {
  createWorkflow,
  WorkflowResponse,
  transform,
  when,
} from "@medusajs/framework/workflows-sdk";
import { getKeycrmProductByIdStep } from "./steps/get-keycrm-product-by-id";
import { getKeycrmOffersByProductIdStep } from "./steps/get-keycrm-offers-by-product-id";
import { getMedusaProductByHandleStep } from "./steps/get-medusa-product-by-handle";

export const getKeycrmProductWorkflow = createWorkflow(
  "get-keycrm-product-by-id-workflow",
  (input: { handle: string }) => {
    const medusaProduct = getMedusaProductByHandleStep({
      handle: input.handle,
    });

    const product = getKeycrmProductByIdStep({
      product_id: medusaProduct.external_id ?? "",
    });

    const offers = when(
      "when-keycrm-product-has-offers",
      product,
      (product) => product.has_offers
    ).then(() => {
      return getKeycrmOffersByProductIdStep({ product_id: product.id });
    });

    const productOptions = transform({ offers }, (data) => {
      function sortArrayOfGradings(array: any) {
        function parseGradingOrder(grading: string) {
          let order = 0;

          if (grading.includes("s")) {
            order = -1;
          } else if (grading.includes("m")) {
            order = 0;
          } else if (grading.includes("l")) {
            order = 1;
          }

          const n = Number(grading.match(/\d+(?!X)/));

          const numXes = grading.match(/x*/)![0].length;

          const mul = n ? n : numXes + 1;

          return order * mul;
        }

        return array.sort((a: any, b: any) => {
          if (!isNaN(a) && !isNaN(b)) return a - b;
          if (!isNaN(a) && isNaN(b)) return -1;
          if (isNaN(a) && !isNaN(b)) return 1;
          if (isNaN(a) && isNaN(b)) {
            let aOrder = parseGradingOrder(a.toLowerCase());
            let bOrder = parseGradingOrder(b.toLowerCase());
            return aOrder - bOrder;
          }
        });
      }

      const productOptions = data.offers.at(0).product.properties_agg;
      productOptions.size = sortArrayOfGradings(productOptions.size);

      return productOptions;
    });

    const transformedProduct = transform(
      { product, offers, productOptions },
      (data) => {
        Object.assign(data.product, {
          properties: productOptions,
        });

        data.offers.forEach((offer: { product: any }) => delete offer.product);

        return {
          ...data.product,
          ...{ offers: data.offers },
        };
      }
    );

    return new WorkflowResponse({
      products: transformedProduct,
    });
  }
);
