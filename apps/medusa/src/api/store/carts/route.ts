import { AdditionalData, HttpTypes } from "@medusajs/framework/types";
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import { refetchCart } from "@medusajs/medusa/api/store/carts/helpers";
import { createCartWorkflow } from "../../../workflows/keycrm/create-cart";

export const POST = async (
  req: AuthenticatedMedusaRequest<HttpTypes.StoreCreateCart & AdditionalData>,
  res: MedusaResponse<HttpTypes.StoreCartResponse>
) => {
  const { result } = await createCartWorkflow(req.scope).run();

  const cart = await refetchCart(result.id, req.scope, ["*"]);

  res.status(200).json({ cart });
};
