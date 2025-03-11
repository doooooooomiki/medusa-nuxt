import {
  createWorkflow,
  WorkflowResponse,
  transform,
  when,
} from "@medusajs/framework/workflows-sdk";
import { getKeycrmProductByIdStep } from "./steps/get-keycrm-product-by-id";
import { getKeycrmOffersByProductIdStep } from "./steps/get-keycrm-offers-by-product-id";
import { getMedusaProductByHandleStep } from "./steps/get-medusa-product-by-handle";
import { aggregateProductOptionsFromKeycrmOffersStep } from "./steps/aggregate-product-options-from-keycrm-offers";

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

    const productOptions = aggregateProductOptionsFromKeycrmOffersStep({
      offers,
    });

    const transformedProduct = transform(
      { product, offers, productOptions },
      (data) => {
        Object.assign(data.product, {
          properties: productOptions,
        });

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
