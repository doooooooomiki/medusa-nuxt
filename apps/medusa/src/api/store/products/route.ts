import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { getKeycrmProductWorkflow } from "../../../workflows/keycrm/get-product";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  if (req.query.handle) {
    const { result } = await getKeycrmProductWorkflow(req.scope).run({
      input: {
        handle: req.params.handle,
      },
    });

    return res.status(200).json(result.productWithOffers);
  } else {
    // TODO: get products paginated
  }
};
