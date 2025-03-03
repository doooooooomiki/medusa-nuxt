import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createKeycrmLinkingWorkflow } from "../../../workflows/create-keycrm-linking";

import { PostAdminCreateKeycrmLinkingType } from "./validators";

export const POST = async (
  req: MedusaRequest<PostAdminCreateKeycrmLinkingType>,
  res: MedusaResponse
) => {
  const { result } = await createKeycrmLinkingWorkflow(req.scope).run({
    input: req.validatedBody,
  });

  res.json({ linking: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  const { data: linkings, metadata: { count, take, skip } = {} } =
    await query.graph({
      entity: "linking",
      ...req.queryConfig,
    });

  res.json({
    linkings,
    count,
    limit: take,
    offset: skip,
  });
};
