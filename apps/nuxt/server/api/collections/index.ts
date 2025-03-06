import { serverMedusaClient } from "#medusa/server";

export default eventHandler(async (event) => {
  const client = serverMedusaClient(event);

  const { collections } = await client.store.collection.list();

  return { collections };
});
