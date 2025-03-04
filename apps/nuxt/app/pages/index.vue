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
      <NuxtLinkLocale to="/products/the-democracy-manifest-sticker-pack">
        {{ "the-democracy-manifest-sticker-pack" }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
