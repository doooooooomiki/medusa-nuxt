import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { MedusaError } from "@medusajs/framework/utils";
import { KEYCRM_MODULE } from "../../../modules/keycrm";
import KeycrmModuleService from "../../../modules/keycrm/service";

export const getKeycrmProductsStep = createStep(
  "get-keycrm-products-step",
  async (
    input: {
      limit: string;
      page: string;
      filter: string;
    },
    { container }
  ) => {
    const keycrmService: KeycrmModuleService = container.resolve(KEYCRM_MODULE);

    const products = await keycrmService.getProducts(input);

    if (!products) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "no product");
    }

    return new StepResponse(products);
  }
);
