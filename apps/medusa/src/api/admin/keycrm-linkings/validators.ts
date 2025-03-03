import { z } from "zod";

export const PostAdminCreateKeycrmLinkingSchema = z.object({
  keycrm_product_id: z.number(),
  handle: z.string(),
});

export type PostAdminCreateKeycrmLinkingType = z.infer<
  typeof PostAdminCreateKeycrmLinkingSchema
>;
