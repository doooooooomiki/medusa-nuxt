import { $Fetch, ofetch } from "ofetch";

type Options = {
  keycrmApiKey: string;
  keycrmApiBaseUrl: string;
};

export default class KeycrmModuleService {
  private $fetch: $Fetch;

  constructor({}, options: Options) {
    this.$fetch = ofetch.create({
      baseURL: options.keycrmApiBaseUrl,
      headers: {
        authorization: `Bearer ${options.keycrmApiKey}`,
        accept: "application/json",
      },
    });
  }

  async getProduct(product_id: string) {
    return await this.$fetch(`products/${product_id}`);
  }

  async getProducts({ limit = 15, page = 1, filter = {} }) {
    return await this.$fetch(`products`, {
      query: {
        limit,
        page,
        filter,
      },
    });
  }

  async getOffer(offer_id: string) {
    return await this.$fetch(`offers`, {
      query: {
        "filter[id]": offer_id,
        include: "product",
      },
    });
  }

  async getOffers(product_id: number) {
    const { data: offers } = await this.$fetch(`offers`, {
      query: {
        sort: "id",
        limit: 50,
        "filter[product_id]": product_id,
      },
    });

    return offers;
  }

  async getOffersStockData(offers_id: string) {
    return await this.$fetch(`offers/stocks`, {
      query: {
        "filter[offers_id]": offers_id,
      },
    });
  }

  async getOffersStocksData(offers_id: string[]) {
    return await this.$fetch(`offers/stocks`, {
      query: {
        limit: 50,
        "filter[offers_id]": offers_id.join(),
      },
    });
  }

  async getCategories() {
    const { data: categories } = await this.$fetch("products/categories", {});
    return categories;
  }
}
