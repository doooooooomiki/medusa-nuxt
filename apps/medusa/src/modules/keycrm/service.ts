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

  async getOffers(product_id: number) {
    const { data: offers } = await this.$fetch(`offers`, {
      query: {
        "filter[product_id]": product_id,
        limit: 50,
        include: "product",
      },
    });

    return offers;
  }

  async getCategories() {
    const { data: categories } = await this.$fetch("products/categories", {});
    return categories;
  }
}
