import { MedusaRequest } from "@medusajs/framework/http";
import {
  createWorkflow,
  WorkflowResponse,
  when,
} from "@medusajs/framework/workflows-sdk";
import { getKeycrmProductsStep } from "./steps/get-products";

export const getKeycrmProductWorkflow = createWorkflow(
  "get-keycrm-products-workflow",
  (input: { req: MedusaRequest }) => {
    const products = when(input.req, (req) => !req.params.handle).then(() => {
      return getKeycrmProductsStep({
        limit: input.req.params.limit,
        page: input.req.params.page,
        filter: input.req.params.filter,
      });
    });

    when(products, (products) => products).then(() => {
      return new WorkflowResponse({
        products,
      });
    });
  }
);
