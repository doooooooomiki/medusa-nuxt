import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { PostAdminCreateKeycrmLinkingSchema } from "./admin/keycrm-linkings/validators";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";

export const GetKeycrmLinkingsSchema = createFindParams();

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/keycrm-linkings",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateKeycrmLinkingSchema),
      ],
    },
    {
      matcher: "/admin/keycrm-linkings",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(GetKeycrmLinkingsSchema, {
          defaults: ["id", "keycrm_product_id", "handle"],
          isList: true,
        }),
      ],
    },
  ],
});
