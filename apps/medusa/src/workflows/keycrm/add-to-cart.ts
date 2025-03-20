import {
  createWorkflow,
  parallelize,
  transform,
  when,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { CreateCartCreateLineItemDTO } from "@medusajs/framework/types";
import {
  useQueryGraphStep,
  validateCartStep,
  getLineItemActionsStep,
  createLineItemsStep,
  updateLineItemsStep,
  refreshCartItemsWorkflow,
} from "@medusajs/medusa/core-flows";
import { getKeycrmOfferByIdStep } from "./steps/get-keycrm-offer-by-id";
import { validateVariantPriceStep } from "./steps/validate-variant-price";
import { validateLineItemPriceStep } from "./steps/validate-line-item-price";
import { prepareLineItemDataStep } from "./steps/prepare-line-item-data";
import { confirmInventoryStep } from "./steps/confirm-inventory";
import { getKeycrmOffersStocksStep } from "./steps/get-keycrm-offers-stocks";
import { isDefined } from "@medusajs/framework/utils";

export interface AddToCartWorkflowInputDTO {
  /**
   * The ID of the cart to add items to.
   */
  cart_id: string;
  /**
   * The item to add to the cart.
   */
  item: CreateCartCreateLineItemDTO;
}

export const addToCartWorkflow = createWorkflow(
  "add-to-cart-workflow",
  (input: WorkflowData<AddToCartWorkflowInputDTO>) => {
    // @ts-ignore
    const cartQuery = useQueryGraphStep({
      entity: "cart",
      filters: { id: input.cart_id },
      fields: ["id", "items.*"],
      options: { throwIfKeyNotFound: true },
    }).config({ name: "get-cart" });

    const cart = transform({ cartQuery }, ({ cartQuery }) => {
      return cartQuery.data[0];
    });

    validateCartStep({ cart });

    const variantId = transform(
      { input },
      (data) => data.input.item.variant_id
    );

    const variant = when({ variantId }, ({ variantId }) =>
      Boolean(variantId)
    ).then(() => {
      return getKeycrmOfferByIdStep({
        offer_id: variantId,
      });
    });

    validateVariantPriceStep({ variant });

    const lineItem = prepareLineItemDataStep({
      item: input.item,
      variant,
      cart_id: cart.id,
    });

    validateLineItemPriceStep({ item: lineItem });

    const { itemsToCreate = [], itemsToUpdate = [] } = getLineItemActionsStep({
      id: cart.id,
      items: [lineItem],
    });

    const itemsToConfirmInventory = transform(
      { itemsToUpdate, itemsToCreate },
      (data) => {
        return (data.itemsToUpdate as [])
          .concat(data.itemsToCreate as [])
          .filter(
            (
              item:
                | {
                    data: { variant_id: string };
                  }
                | { variant_id?: string }
            ) =>
              isDefined(
                "data" in item ? item.data?.variant_id : item.variant_id
              )
          ) as unknown as [
          | {
              data: { variant_id: string; quantity: number };
            }
          | { variant_id?: string; quantity: string }
        ];
      }
    );

    const inventoryData = getKeycrmOffersStocksStep({ offers_id: [variantId] });

    const inventory = transform({ inventoryData }, ({ inventoryData }) => {
      return inventoryData.at(0);
    });

    confirmInventoryStep({
      inventory,
      items: itemsToConfirmInventory,
    });

    const [createdLineItems, updatedLineItems] = parallelize(
      createLineItemsStep({
        id: cart.id,
        items: itemsToCreate,
      }),
      updateLineItemsStep({
        id: cart.id,
        items: itemsToUpdate,
      })
    );

    const allItems = transform(
      { createdLineItems, updatedLineItems },
      ({ createdLineItems = [], updatedLineItems = [] }) => {
        return createdLineItems.concat(updatedLineItems);
      }
    );

    // TODO: make own
    refreshCartItemsWorkflow.runAsStep({
      input: { cart_id: cart.id, items: allItems },
    });

    return new WorkflowResponse(void 0);
  }
);
