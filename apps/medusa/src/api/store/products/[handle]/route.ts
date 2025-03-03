import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { getKeycrmProductWorkflow } from "../../../../workflows/keycrm/get-product";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { result } = await getKeycrmProductWorkflow(req.scope).run({
    input: {
      handle: req.params.handle,
    },
  });

  res.status(200).json(result.productWithOffers);
};
