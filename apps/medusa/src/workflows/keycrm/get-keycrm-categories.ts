import {
  createWorkflow,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk";
import { getKeycrmCategoriesStep } from "./steps/get-keycrm-categories";
import slugify from "slugify";

export const getKeycrmCategoriesWorkflow = createWorkflow(
  "get-keycrm-categories-workflow",
  () => {
    const categoriesFromKeycrm = getKeycrmCategoriesStep();

    const categories = transform(
      categoriesFromKeycrm,
      (categoriesFromKeycrm) => {
        return categoriesFromKeycrm.map((c: { [x: string]: string }) => {
          Object.assign(c, { ["title"]: c["name"] });
          Object.assign(c, { ["handle"]: slugify(c["name"], { lower: true }) });
          return c;
        });
      }
    );

    return new WorkflowResponse({
      categories,
    });
  }
);
