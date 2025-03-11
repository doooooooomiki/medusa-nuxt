import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { MedusaError } from "@medusajs/framework/utils";

export const aggregateProductOptionsFromKeycrmOffersStep = createStep(
  "aggregate-product-options-from-keycrm-offers-step",
  async (input: { offers: { properties: any[] }[] }) => {
    if (!input.offers) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `No offers were provided`
      );
    }

    if (
      input.offers.length === 1 &&
      input.offers.at(0)?.properties.length === 0
    ) {
      return new StepResponse([]);
    }

    const aggregation = new Map();

    input.offers.forEach((offer: { properties: any[] }) => {
      offer.properties.forEach((property: { name: any; value: any }) => {
        if (!aggregation.has(property.name)) {
          aggregation.set(property.name, new Set());
        }
        aggregation.get(property.name).add(property.value);
      });
    });

    const options: Array<
      {
        name: string;
      } & {
        values: string[];
      }
    > = [];

    for (const key of aggregation.keys()) {
      const option = Object.assign(
        {},
        { name: key },
        { values: [...aggregation.get(key)] }
      );
      options.push(option);
    }

    return new StepResponse(options);
  }
);
