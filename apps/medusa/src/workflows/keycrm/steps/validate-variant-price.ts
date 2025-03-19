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
  variant: {
    /**
     * The ID of the variant.
     */
    id: string;
    /**
     * The calculated price of the variant.
     */
    price?: BigNumberInput | null;
  };
}

export const validateVariantPriceStepId = "validate-variant-price-step";
/**
 * This step validates the specified variant objects to ensure they have prices.
 * If not valid, the step throws an error.
 *
 * @example
 * const data = validateVariantPricesStep({
 *   variant:
 *     {
 *       id: "variant_321",
 *       price:  10,
 *     }
 * })
 */
export const validateVariantPriceStep = createStep(
  validateVariantPriceStepId,
  async (data: ValidateVariantPriceStepInput) => {
    if (!data.variant) {
      return;
    }

    if (!data.variant.price)
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Variant with ID ${data.variant.id} does not have a price`
      );
  }
);
