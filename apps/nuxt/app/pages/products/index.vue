<script setup lang="ts">
const { data, error } = await useFetch("/api/products");

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const products = data?.value?.products;
</script>

<template>{{ products }}</template>
