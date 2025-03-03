import {
  createWorkflow,
  WorkflowResponse,
  transform,
  when,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { MedusaError } from "@medusajs/framework/utils";
import { getKeycrmProductStep } from "./steps/get-product";
import { getKeycrmOffersStep } from "./steps/get-offers";

export const getKeycrmProductWorkflow = createWorkflow(
  "get-keycrm-product-workflow",
  (input: { handle: string }) => {
    // @ts-ignore
    const { data: linkings } = useQueryGraphStep({
      entity: "linking",
      fields: ["*"],
      filters: { handle: input.handle },
    });

    const linking = transform(
      linkings,
      (linkings): { keycrm_product_id: number } => {
        if (!linkings.at(0)) {
          throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            "no linkings.at(0)"
          );
        }

        if (!linkings.at(0)?.keycrm_product_id) {
          throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            "no keycrm_product_id"
          );
        }

        return linkings.at(0) as { keycrm_product_id: number };
      }
    );

    const product = getKeycrmProductStep({ id: linking.keycrm_product_id });

    const offers = when(product, (product) => product.has_offers).then(() => {
      return getKeycrmOffersStep(product.id);
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
