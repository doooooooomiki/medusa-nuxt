<script setup lang="ts">
// const { data, error } = await useFetch("/api/products");

// if (error.value) {
//   throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
// }

// const products = data?.value?.products;
</script>

<template>
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
</template>
