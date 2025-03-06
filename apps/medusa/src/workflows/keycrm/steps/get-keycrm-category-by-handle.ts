import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const getKeycrmCategoryByHandleStep = createStep(
  "get-keycrm-category-by-handle-step",
  async (input: { categories: []; handle: string }) => {
    const categories = input.categories.filter(
      (c: { handle: string }) => c.handle === input.handle
    );

    return new StepResponse(categories);
  }
);
