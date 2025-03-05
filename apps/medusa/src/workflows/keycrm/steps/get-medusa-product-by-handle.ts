import { IProductModuleService } from "@medusajs/framework/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";
import { MedusaError } from "@medusajs/framework/utils";

export const getMedusaProductByHandleStep = createStep(
  "get-medusa-product-by-handle-step",
  async (input: { handle: string }, { container }) => {
    if (!input.handle) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `No valid handle for medusa product provided. Given handle is '${input.handle}'`
      );
    }

    const productModuleService = container.resolve<IProductModuleService>(
      Modules.PRODUCT
    );

    const product = await productModuleService.listProducts({
      handle: input.handle,
    });

    if (product.length === 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `No medusa product with handle ${input.handle} found`
      );
    }

    if (product.length !== 1) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Could not find exactly 1 medusa product with handle: ${input.handle}`
      );
    }

    if (!product.at(0)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Could not find first product within product array for medusa product with handle: ${input.handle}`
      );
    }

    return new StepResponse(product.at(0));
  }
);
