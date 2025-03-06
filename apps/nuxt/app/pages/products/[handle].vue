<script setup lang="ts">
const route = useRoute();
// TODO: throw if route.params.handle is anything else than string

const { data: product, error } = await useFetch<any>(
  route.params.handle as string,
  {
    baseURL: "/api/products/",
  }
);

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>

<template>
  {{ product }}
</template>
