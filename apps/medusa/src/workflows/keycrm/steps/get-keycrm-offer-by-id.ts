import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { MedusaError } from "@medusajs/framework/utils";
import { KEYCRM_MODULE } from "../../../modules/keycrm";
import KeycrmModuleService from "../../../modules/keycrm/service";

export const getKeycrmOfferByIdStep = createStep(
  "get-keycrm-offer-by-id-step",
  async (input: { offer_id: string }, { container }) => {
    if (!input.offer_id) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        `No valid offer ID for keycrm offer provided. Given Offer ID is '${input.offer_id}'`
      );
    }

    const keycrmService: KeycrmModuleService = container.resolve(KEYCRM_MODULE);

    const offer = await keycrmService.getOffer(input.offer_id);

    if (!offer) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No keycrm offer for provided offer id found"
      );
    }

    if (!offer.data.at(0)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Could not find first offer within offer array of keycrm response`
      );
    }

    return new StepResponse(offer.data.at(0));
  }
);
