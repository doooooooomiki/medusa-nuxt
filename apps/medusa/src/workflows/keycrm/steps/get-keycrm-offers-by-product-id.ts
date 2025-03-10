import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { MedusaError } from "@medusajs/framework/utils";
import { KEYCRM_MODULE } from "../../../modules/keycrm";
import KeycrmModuleService from "../../../modules/keycrm/service";

export const getKeycrmOffersByProductIdStep = createStep(
  "get-keycrm-offers-by-product-id-step",
  async (input: { product_id: number }, { container }) => {
    const keycrmService: KeycrmModuleService = container.resolve(KEYCRM_MODULE);

    const offers = await keycrmService.getOffers(input.product_id);

    if (!offers) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No keycrm offers for provided product id found"
      );
    }

    if (!offers.at(0)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Could not find first offer within offer array of keycrm response`
      );
    }

    if (!offers.at(0).product) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `First offer does not include product`
      );
    }

    if (!offers.at(0).product.properties_agg) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `First offer's product does not provide properties_agg`
      );
    }

    return new StepResponse(offers);
  }
);
