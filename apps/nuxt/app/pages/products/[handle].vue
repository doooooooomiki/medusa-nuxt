<script setup lang="ts">
const route = useRoute();

const { data, error } = await useFetch<any>(route.params.handle as string, {
  baseURL: "/api/products/",
});

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const products = data?.value?.products;
</script>

<template>
  {{ products }}
</template>
