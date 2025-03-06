import {
  createWorkflow,
  WorkflowResponse,
  transform,
  when,
} from "@medusajs/framework/workflows-sdk";
import { getKeycrmCategoriesStep } from "./steps/get-keycrm-categories";
import { getKeycrmCategoryByHandleStep } from "./steps/get-keycrm-category-by-handle";
import slugify from "slugify";

export const getKeycrmCategoryByHandleWorkflow = createWorkflow(
  "get-keycrm-category-by-handle-workflow",
  (input: { handle: string | undefined }) => {
    const categoriesFromKeycrm = getKeycrmCategoriesStep();

    const categoriesAdjusted = transform(
      categoriesFromKeycrm,
      (categoriesFromKeycrm) => {
        return categoriesFromKeycrm.map((c: { [x: string]: string }) => {
          Object.assign(c, { ["title"]: c["name"] });
          Object.assign(c, { ["handle"]: slugify(c["name"], { lower: true }) });
          return c;
        });
      }
    );

    const categories = when(input, (input) => Boolean(input.handle)).then(() =>
      getKeycrmCategoryByHandleStep({
        categories: categoriesAdjusted,
        handle: input.handle as string,
      })
    );

    return new WorkflowResponse({
      categories,
    });
  }
);
