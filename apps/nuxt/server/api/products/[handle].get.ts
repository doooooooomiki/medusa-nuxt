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

    if (products.length !== 1) {
      throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }

    return products.at(0);
  }
});
