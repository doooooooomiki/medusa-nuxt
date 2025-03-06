<script setup lang="ts">
const route = useRoute();
const handle = computed(() => route.params.handle as string);

// TODO: throw if route.params.handle is anything else than string

const { data: product, error } = await useFetch<any>(handle, {
  baseURL: "/api/products/",
});

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>

<template>
  {{ product }}
</template>
