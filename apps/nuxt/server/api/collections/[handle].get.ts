import { serverMedusaClient } from "#medusa/server";

export default eventHandler(async (event) => {
  const client = serverMedusaClient(event);

  const handle = getRouterParam(event, "handle");

  const { collections } = await client.store.collection.list({
    handle,
  });
  // TODO: throw when no collection found e.g. collections = []

  return collections;

  // TODO: fetch products from collection

  // const { products } = await client.store.product.list({
  //   collection_id: collections.at(0)?.id,
  // });

  // return products;
});
