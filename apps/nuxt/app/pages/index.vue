<script setup>
const { t } = useI18n();
</script>

<template>
  <div>
    <NuxtLinkLocale to="/ui">{{ t("ui") }}</NuxtLinkLocale>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
