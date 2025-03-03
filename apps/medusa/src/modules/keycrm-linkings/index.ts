import KeycrmLinkingModuleService from "./service";
import { Module } from "@medusajs/framework/utils";

export const KEYCRM_LINKING_MODULE = "keycrmlinking";

export default Module(KEYCRM_LINKING_MODULE, {
  service: KeycrmLinkingModuleService,
});
