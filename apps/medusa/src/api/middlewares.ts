import { defineMiddlewares } from "@medusajs/framework/http";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";

export const GetKeycrmLinkingsSchema = createFindParams();

export default defineMiddlewares({
  routes: [],
});
