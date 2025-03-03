import { MedusaService } from "@medusajs/framework/utils";
import Linking from "./models/linking";

class KeycrmLinkingModuleService extends MedusaService({
  Linking,
}) {}

export default KeycrmLinkingModuleService;
