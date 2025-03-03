import { serverMedusaClient } from "#medusa/server";

export default eventHandler(async (event) => {
  const client = serverMedusaClient(event);

  const { products } = await client.store.product.list();

  if (products.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }

  return { products };
});
