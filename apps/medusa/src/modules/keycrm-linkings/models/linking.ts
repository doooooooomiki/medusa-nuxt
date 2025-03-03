import { model } from "@medusajs/framework/utils";

const Linking = model.define("linking", {
  id: model.id().primaryKey(),
  keycrm_product_id: model.number().unique(),
  handle: model.text().unique().searchable(),
});

export default Linking;
