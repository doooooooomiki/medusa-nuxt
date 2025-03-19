import * as v from "valibot";

export const ProductPropertiesSchema = v.array(
  v.object({
    name: v.string(),
    values: v.array(v.union([v.string(), v.number()])),
  })
);

export const ProductOffersSchema = v.object({
  status: v.optional(v.picklist(["public", "private"]), "private"),
  created: v.optional(v.date(), () => new Date()),
  title: v.pipe(v.string(), v.maxLength(100)),
  source: v.pipe(v.string(), v.url()),
  size: v.pipe(v.number(), v.minValue(0)),
});

export const ProductSchema = v.object({
  id: v.pipe(v.number(), v.integer("Product Id must be an Integer.")),
  name: v.string("Product Name must be a String."),
  description: v.nullable(v.string("Product Description must be a String.")),
  thumbnail_url: v.pipe(
    v.string("Product Thumbnail URL must be a String."),
    v.url("Product Thumbnail URL is badly formatted.")
  ),
  attachments_data: v.array(
    v.pipe(
      v.string("Product Attachment  must be a String."),
      v.url("Product Attachment URL is badly formatted.")
    )
  ),
  quantity: v.pipe(
    v.number(),
    v.integer("Product Quantity must be an Integer."),
    v.minValue(0, "Product Quantity must be at least 0.")
  ),
  unit_type: v.nullable(v.string("Product Unit Type must be a String.")),
  currency_code: v.string("Product Currency Code must be a String."),
  sku: v.optional(v.string()),
  min_price: v.pipe(
    v.number("Product Quantity must be a Decimal."),
    v.minValue(0, "Product Quantity must be at least 0.")
  ),
  max_price: v.pipe(
    v.number("Product Quantity must be a Decimal."),
    v.minValue(0, "Product Quantity must be at least 0.")
  ),
  weight: v.nullable(v.number("Product Weight must be a Number.")),
  length: v.nullable(v.number("Product Length must be a Number.")),
  width: v.nullable(v.number("Product Width must be a Number.")),
  height: v.nullable(v.number("Product Height must be a Number.")),
  has_offers: v.boolean("Product has_offers Field must be a Boolean"),
  is_archived: v.boolean("Product is_archived Field must be a Boolean"),
  category_id: v.nullable(
    v.pipe(v.number(), v.integer("Product Category Id must be an Integer."))
  ),
  created_at: v.pipe(
    v.string(),
    v.isoTimestamp("Product create timestamp is badly formatted.")
  ),
  updated_at: v.pipe(
    v.string(),
    v.isoTimestamp("Product create timestamp is badly formatted.")
  ),
  properties: ProductPropertiesSchema,
});

export type ProductInput = v.InferInput<typeof ProductSchema>;
export type ProductOutput = v.InferOutput<typeof ProductSchema>;
export type ProductPropertiesOutput = v.InferOutput<
  typeof ProductPropertiesSchema
>;
