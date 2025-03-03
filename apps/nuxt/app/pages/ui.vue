<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
const { t } = useI18n();

const { data } = await useFetch("/api/products");
const products = data?.value?.products;

console.info({ products });
</script>

<template>
  <NuxtLinkLocale to="/">{{ t("welcome") }}</NuxtLinkLocale>
  <div>
    <SwitchLocalePathLink locale="en">english</SwitchLocalePathLink>
  </div>
  <div>
    <SwitchLocalePathLink locale="fr">français</SwitchLocalePathLink>
  </div>
  <div>
    <SwitchLocalePathLink locale="uk">українська мова</SwitchLocalePathLink>
  </div>
  <Button
    @click="
      () => {
        toast({
          title: 'Scheduled: Catch up',
          description: 'Friday, February 10, 2023 at 5:57 PM',
        });
      }
    "
  >
    Add to calendar
  </Button>
</template>
