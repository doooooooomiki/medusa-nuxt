<script setup lang="ts">
import type { ProductOutput } from "@@/shared/types";

const { t } = useI18n();
const route = useRoute();
const handle = computed(() => route.params.handle as string);

// TODO: throw if route.params.handle is anything else than string

const { data: product, error } = await useFetch<ProductOutput>(handle, {
  baseURL: "/api/products/",
});

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const variants = computed(() => product.value?.offers);
const options = computed(() => product.value?.properties);
</script>

<template>
  <NuxtLinkLocale to="/">{{ t("welcome") }}</NuxtLinkLocale>
  <section>
    <h1>{{ product.name }}</h1>
  </section>

  <div>
    <NuxtLinkLocale to="/products/hooray-for-boobies-t-shirt">
      {{ "hooray-for-boobies-t-shirt" }}
    </NuxtLinkLocale>
  </div>
  <div>
    <NuxtLinkLocale to="/products/the-pickles-t-shirt">
      {{ "the-pickles-t-shirt" }}
    </NuxtLinkLocale>
  </div>
  <div>
    <NuxtLinkLocale to="/products/as-purr-my-last-email-t-shirt">
      {{ "as-purr-my-last-email-t-shirt" }}
    </NuxtLinkLocale>
  </div>
  <div>
    <NuxtLinkLocale to="/products/him-t-shirt">
      {{ "him-t-shirt" }}
    </NuxtLinkLocale>
  </div>
  <div>
    <NuxtLinkLocale to="/products/this-is-democracy-manifest-t-shirt">
      {{ "this-is-democracy-manifest-t-shirt" }}
    </NuxtLinkLocale>
  </div>

  <ProductForm :product="product" :variants="variants" :options="options" />
</template>
