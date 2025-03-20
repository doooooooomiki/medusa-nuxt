import { StepResponse, createStep } from "@medusajs/framework/workflows-sdk";
import { MathBN, MedusaError } from "@medusajs/framework/utils";

export interface ConfirmVariantInventoryStepInput {
  inventory: { quantity: number };
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
  async (input: ConfirmVariantInventoryStepInput) => {
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

    if (!input.inventory) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "No Inventory to confirm inventory were provided"
      );
    }

    if (!input.inventory.quantity) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Provided Inventory does not have a quantity to confirm inventory"
      );
    }

    const item = input.items.at(0);
    const inventory = input.inventory;

    const gte = MathBN.gte(
      inventory.quantity,
      "data" in item! ? item!.data.quantity : item!.quantity
    );

    if (!gte) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Not enough Inventory available. Asked for ${
          "data" in item! ? item!.data.quantity : item!.quantity
        }, actual quantity available ${inventory.quantity}`
      );
    }

    return new StepResponse(gte);
  }
);
