import { serverMedusaClient } from "#medusa/server";

export default eventHandler(async (event) => {
  const client = serverMedusaClient(event);
  const { products } = await client.store.product.list();

  return { products };
});
