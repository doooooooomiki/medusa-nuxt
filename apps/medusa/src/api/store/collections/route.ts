import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { getKeycrmCategoriesWorkflow } from "../../../workflows/keycrm/get-keycrm-categories";
import { getKeycrmCategoryByHandleWorkflow } from "../../../workflows/keycrm/get-keycrm-category-by-handle";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  if (req.query && req.query.handle) {
    const { result } = await getKeycrmCategoryByHandleWorkflow(req.scope).run({
      input: {
        handle: req.query.handle as string | undefined,
      },
    });
    return res.status(200).json({ collections: result.categories });
  }

  const { result } = await getKeycrmCategoriesWorkflow(req.scope).run();
  return res.status(200).json({ collections: result.categories });
};
