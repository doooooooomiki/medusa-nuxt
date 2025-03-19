import { KEYCRM_MODULE } from "../../../modules/keycrm";
import KeycrmModuleService from "../../../modules/keycrm/service";
import { StepResponse, createStep } from "@medusajs/framework/workflows-sdk";
import { MathBN, MedusaError } from "@medusajs/framework/utils";

export interface ConfirmVariantInventoryStepInput {
  offer_id: string;
  items:
    | [
        | {
            data: { variant_id: string; quantity: number };
          }
        | { variant_id?: string; quantity: string }
      ];
}

export const confirmInventoryStepId = "confirm-inventory-step";

export const confirmInventoryStep = createStep(
  confirmInventoryStepId,
  async (input: ConfirmVariantInventoryStepInput, { container }) => {
    if (!input.items) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "No items to confirm inventory were provided"
      );
    }

    if (input.items && !input.items.at(0)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "No item at index 0 of items array found"
      );
    }

    const item = input.items.at(0);

    const keycrmService: KeycrmModuleService = container.resolve(KEYCRM_MODULE);

    const inventoryResponse = await keycrmService.getOffersStockData(
      input.offer_id
    );

    if (!inventoryResponse) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No keycrm inventory response for provided offer id found."
      );
    }

    if (!inventoryResponse.data) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No keycrm inventory data for provided offer id found."
      );
    }

    if (!inventoryResponse.data.at(0)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Could not find first keycrm inventory in inventory array."
      );
    }

    const inventory = inventoryResponse.data.at(0);

    if (
      !MathBN.gte(
        inventory.quantity,
        "data" in item! ? item!.data.quantity : item!.quantity
      )
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Not enough Inventory available. Asked for ${
          "data" in item! ? item!.data.quantity : item!.quantity
        }, actual quantity available ${inventory.quantity}`
      );
    }

    return new StepResponse(inventory);
  }
);
