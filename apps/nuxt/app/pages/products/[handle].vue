<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
// TODO: throw if route.params.handle is anything else than string

const { data: product, error } = await useFetch<any>(
  route.params.producthandle as string,
  {
    baseURL: "/api/products/",
  }
);

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>

<template>
  <NuxtLinkLocale to="/">{{ t("welcome") }}</NuxtLinkLocale>
  {{ product }}
</template>
