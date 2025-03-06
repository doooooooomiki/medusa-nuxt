<script setup lang="ts">
const { data, error } = await useFetch("/api/collections");

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const collections = data?.value?.collections;
</script>

<template>
  <ul>
    <li v-for="collection in collections">
      <NuxtLink :to="`/collections/${collection.handle}`">
        {{ collection.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
