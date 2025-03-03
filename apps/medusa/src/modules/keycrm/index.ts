import KeycrmModuleService from "./service";
import { Module } from "@medusajs/framework/utils";

export const KEYCRM_MODULE = "keycrm";

export default Module(KEYCRM_MODULE, {
  service: KeycrmModuleService,
});
