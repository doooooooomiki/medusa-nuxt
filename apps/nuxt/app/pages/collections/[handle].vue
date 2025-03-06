<script setup lang="ts">
const route = useRoute();

const { data: product, error } = await useFetch<any>(
  route.params.handle as string,
  {
    baseURL: "/api/collections/",
  }
);
</script>

<template>{{ route.params.handle }}</template>
