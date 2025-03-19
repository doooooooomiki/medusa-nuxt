import { ICartModuleService } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { StepResponse, createStep } from "@medusajs/framework/workflows-sdk";

export const createCartStepId = "create-cart-step";

export const createCartStep = createStep(
  createCartStepId,
  async (_, { container }) => {
    const service = container.resolve<ICartModuleService>(Modules.CART);

    const createdCarts = await service.createCarts([
      {
        currency_code: "uah",
      },
    ]);

    return new StepResponse(
      createdCarts,
      createdCarts.map((cart) => cart.id)
    );
  },
  async (createdCartsIds, { container }) => {
    if (!createdCartsIds?.length) {
      return;
    }

    const service = container.resolve<ICartModuleService>(Modules.CART);

    await service.deleteCarts(createdCartsIds);
  }
);
