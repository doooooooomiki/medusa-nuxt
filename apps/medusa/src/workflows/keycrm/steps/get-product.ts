import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { MedusaError } from "@medusajs/framework/utils";
import { KEYCRM_MODULE } from "../../../modules/keycrm";
import KeycrmModuleService from "../../../modules/keycrm/service";

export const getKeycrmProductStep = createStep(
  "get-keycrm-product-step",
  async (input: { product_id: number }, { container }) => {
    const keycrmService: KeycrmModuleService = container.resolve(KEYCRM_MODULE);

    const product = await keycrmService.getProduct(input.product_id);

    if (!product) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "no product");
    }

    return new StepResponse(product);
  }
);
