import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { getKeycrmProductWorkflow } from "../../../workflows/keycrm/get-keycrm-product";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  if (req.query.handle) {
    const { result } = await getKeycrmProductWorkflow(req.scope).run({
      input: {
        handle: req.query.handle as string,
      },
    });

    return res.status(200).json({ products: [result.products] });
  } else {
    // TODO: get products paginated
  }
};
