<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <div>
      <NuxtLinkLocale to="/ui">{{ t("ui") }}</NuxtLinkLocale>
    </div>
    <div>
      <NuxtLinkLocale to="/products">{{ t("products") }}</NuxtLinkLocale>
    </div>
    <div>
      <NuxtLinkLocale to="/products/as-purr-my-last-email-t-shirt">
        {{ "as-purr-my-last-email-t-shirt" }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
