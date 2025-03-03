import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { KEYCRM_LINKING_MODULE } from "../modules/keycrm-linkings";
import KeycrmLinkingModuleService from "../modules/keycrm-linkings/service";

export type CreateKeycrmLinkingInput = {
  keycrm_product_id: number;
  handle: string;
};

export const createKeycrmLinkingStep = createStep(
  "create-keycrm-linking-step",
  async (input: CreateKeycrmLinkingInput, { container }) => {
    const service: KeycrmLinkingModuleService = container.resolve(
      KEYCRM_LINKING_MODULE
    );

    const linking = await service.createLinkings(input);

    return new StepResponse(linking, linking.id);
  },
  async (id: string, { container }) => {
    const service: KeycrmLinkingModuleService = container.resolve(
      KEYCRM_LINKING_MODULE
    );

    await service.deleteLinkings(id);
  }
);

export const createKeycrmLinkingWorkflow = createWorkflow(
  "create-keycrm-linking-workflow",
  (input: CreateKeycrmLinkingInput) => {
    const linking = createKeycrmLinkingStep(input);
    return new WorkflowResponse(linking);
  }
);
