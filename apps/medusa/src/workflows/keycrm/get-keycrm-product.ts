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
  "get-keycrm-product-by-idworkflow",
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

    const productWithOffers = transform({ product, offers }, (data) => {
      return {
        ...data.product,
        ...{ offers: data.offers },
      };
    });

    return new WorkflowResponse({
      productWithOffers,
    });
  }
);
