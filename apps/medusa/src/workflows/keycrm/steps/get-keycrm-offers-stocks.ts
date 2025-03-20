import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { MedusaError } from "@medusajs/framework/utils";
import { KEYCRM_MODULE } from "../../../modules/keycrm";
import KeycrmModuleService from "../../../modules/keycrm/service";

export interface getKeycrmOffersStocksStepInput {
  offers_id: string[];
}

export const getKeycrmOffersStocksStepId = "get-keycrm-offers-stocks-step";

export const getKeycrmOffersStocksStep = createStep(
  getKeycrmOffersStocksStepId,
  async (input: getKeycrmOffersStocksStepInput, { container }) => {
    if (!input.offers_id) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Input did not provide offers_id Array."
      );
    }

    if (!Array.isArray(input.offers_id)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Input offers_id must be an Array."
      );
    }

    if (input.offers_id.length === 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Input offers_id Array must have at least 1 Entry."
      );
    }

    const keycrmService: KeycrmModuleService = container.resolve(KEYCRM_MODULE);

    const inventoryResponse = await keycrmService.getOffersStocksData(
      input.offers_id
    );

    if (!inventoryResponse) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No keycrm inventory response for provided offers_id."
      );
    }

    if (!inventoryResponse.data) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No keycrm inventory data for provided offers_id found."
      );
    }

    if (!inventoryResponse.data.at(0)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Could not find first keycrm inventory in inventory array."
      );
    }

    return new StepResponse(inventoryResponse.data);
  }
);
