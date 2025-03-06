import { serverMedusaClient } from "#medusa/server";

export default eventHandler(async (event) => {
  const client = serverMedusaClient(event);

  const { collections } = await client.store.collection.list();

  if (collections.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }

  return { collections };
});
