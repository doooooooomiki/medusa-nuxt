<script setup lang="ts">
const { data, error } = await useFetch("/api/collections");

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>

<template>
  <ul>
    <li v-for="collection in data?.collections">
      <NuxtLink :to="`/collections/${collection.handle}`">
        {{ collection.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
