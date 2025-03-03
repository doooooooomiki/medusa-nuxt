import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { MedusaError } from "@medusajs/framework/utils";
import { KEYCRM_MODULE } from "../../../modules/keycrm";
import KeycrmModuleService from "../../../modules/keycrm/service";

export const getKeycrmOffersStep = createStep(
  "get-keycrm-offers-step",
  async (input: { product_id: number }, { container }) => {
    const keycrmService: KeycrmModuleService = container.resolve(KEYCRM_MODULE);

    const offers = await keycrmService.getOffers(input.product_id);

    if (!offers) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "no offers");
    }

    return new StepResponse(offers);
  }
);
