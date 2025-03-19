import { BigNumberInput } from "@medusajs/framework/types";
import { MedusaError, isPresent } from "@medusajs/framework/utils";
import { createStep } from "@medusajs/framework/workflows-sdk";

/**
 * The details of the variants to validate.
 */
export interface ValidateVariantPriceStepInput {
  /**
   * The variants to validate.
   */
  item: {
    /**
     * The calculated price of the variant.
     */
    unit_price?: BigNumberInput | null;
  };
}

export const validateLineItemPriceStepId = "validate-line-item-price-step";
/**
 * This step validates the specified variant objects to ensure they have prices.
 * If not valid, the step throws an error.
 *
 * @example
 * const data = validateVariantPricesStep({
 *   variant:
 *     {
 *       variant_id: "variant_321",
 *       price:  10,
 *     }
 * })
 */
export const validateLineItemPriceStep = createStep(
  validateLineItemPriceStepId,
  async (data: ValidateVariantPriceStepInput) => {
    if (!data.item) {
      return;
    }

    if (!data.item.unit_price)
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Line Item with Variant ID does not have a price`
      );
  }
);
