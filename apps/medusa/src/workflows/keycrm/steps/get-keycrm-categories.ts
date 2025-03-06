import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { MedusaError } from "@medusajs/framework/utils";
import { KEYCRM_MODULE } from "../../../modules/keycrm";
import KeycrmModuleService from "../../../modules/keycrm/service";

export const getKeycrmCategoriesStep = createStep(
  "get-keycrm-categories-step",
  async (_, { container }) => {
    const keycrmService: KeycrmModuleService = container.resolve(KEYCRM_MODULE);

    const categories = await keycrmService.getCategories();

    if (!categories) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "no categories");
    }

    return new StepResponse(categories);
  }
);
