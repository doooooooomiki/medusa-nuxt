<script setup lang="ts">
const route = useRoute();
// TODO: throw if route.params.handle is anything else than string

const { data: collection, error } = await useFetch<any>(
  route.params.handle as string,
  {
    baseURL: "/api/collections/",
  }
);
</script>

<template>
  <ul>
    <li v-for="product in collection">
      <NuxtLink :to="`/products/${product.handle}`">
        {{ product.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
