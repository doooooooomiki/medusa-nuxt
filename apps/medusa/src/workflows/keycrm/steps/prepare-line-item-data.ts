import {
  CreateCartCreateLineItemDTO,
  CreateLineItemForCartDTO,
} from "@medusajs/framework/types";
import { MedusaError } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export interface KeycrmProduct {
  id: number;
  name: string;
  description: string | null;
  thumbnail_url: string | null;
  attachments_data: string[];
  quantity: number;
  currency_code: "UAH";
  sku?: string;
  min_price: number;
  max_price: number;
  has_offers: boolean;
  is_archived: boolean;
  category_id: number | null;
}

export interface KeycrmOffer {
  id: number;
  product_id: number;
  sku: string | null;
  thumbnail_url?: string;
  price: number;
  purchased_price: number;
  quantity: number;
  properties: { name: string; value: unknown }[];
  product: KeycrmProduct;
}

export interface PrepareLineItemDataStepInput {
  item: CreateCartCreateLineItemDTO;
  variant: KeycrmOffer;
  cart_id: string;
}

export const prepareLineItemDataStepId = "prepare-line-item-data-step";

export const prepareLineItemDataStep = createStep(
  prepareLineItemDataStepId,
  async (data: PrepareLineItemDataStepInput) => {
    if (!data.variant) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Data does not have a Variant"
      );
    }

    if (data.variant && !data.variant.product) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Variant does not have a Product"
      );
    }

    const options: Record<string, unknown> = {};

    data.variant.properties.forEach((property) => {
      if (!options.hasOwnProperty(property.name)) {
        options[property.name] = property.value;
      }
    });

    const lineItem: CreateLineItemForCartDTO = {
      quantity: data.item.quantity,
      variant_id: data.variant.id.toString(),
      title: data.variant.product.name,
      thumbnail: data.variant.thumbnail_url
        ? data.variant.thumbnail_url
        : data.variant.product.thumbnail_url
        ? data.variant.product.thumbnail_url
        : undefined,
      product_id: data.variant.product_id.toString(),
      product_title: data.variant.product?.name,
      product_description: data.variant.product.description ?? undefined,
      product_collection: data.variant.product.category_id
        ? data.variant.product.category_id.toString()
        : undefined,
      variant_sku: data.variant.sku ? data.variant.sku : undefined,
      variant_option_values: options,
      is_tax_inclusive: true,
      unit_price: data.variant.price,
      cart_id: data.cart_id,
    };

    return new StepResponse(lineItem);
  }
);
