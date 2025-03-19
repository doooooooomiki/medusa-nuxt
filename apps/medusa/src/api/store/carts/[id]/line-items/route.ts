import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { HttpTypes } from "@medusajs/framework/types";
import { refetchCart } from "@medusajs/medusa/api/store/carts/helpers";
import { StoreAddCartLineItemType } from "@medusajs/medusa/api/store/carts/validators";
import { addToCartWorkflow } from "../../../../../workflows/keycrm/add-to-cart";

export const POST = async (
  req: MedusaRequest<StoreAddCartLineItemType>,
  res: MedusaResponse<HttpTypes.StoreCartResponse>
) => {
  await addToCartWorkflow(req.scope).run({
    input: {
      cart_id: req.params.id,
      item: req.validatedBody,
    },
  });

  const cart = await refetchCart(req.params.id, req.scope, ["*", "items.*"]);

  res.status(200).json({ cart });
};
