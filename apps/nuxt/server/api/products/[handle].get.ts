import * as v from "valibot";
import { serverMedusaClient } from "#medusa/server";

export default eventHandler(async (event) => {
  const client = serverMedusaClient(event);

  const handle = getRouterParam(event, "handle");

  const HandleSchema = v.undefinedable(v.string());

  const handleValidated = v.safeParse(HandleSchema, handle);

  if (handleValidated.success) {
    const { products } = await client.store.product.list({
      fields: "+external_id",
      handle: handleValidated.output,
    });

    return products.at(0);
  }
});
