import { defineMiddlewares } from "@medusajs/framework/http";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";
import { storeCartRoutesMiddlewares } from "./store/carts/middlewares";

export const GetKeycrmLinkingsSchema = createFindParams();

export default defineMiddlewares({
  routes: [...storeCartRoutesMiddlewares],
});
