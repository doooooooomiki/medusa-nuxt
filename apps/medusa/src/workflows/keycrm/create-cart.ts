import {
  createWorkflow,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk";
import { createCartStep } from "./steps/create-cart";

export const createCartWorkflow = createWorkflow("create-cart-workflow", () => {
  const carts = createCartStep();
  const cart = transform({ carts }, (data) => data.carts?.[0]);
  return new WorkflowResponse(cart);
});
