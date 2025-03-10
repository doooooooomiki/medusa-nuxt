<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/valibot";
import * as v from "valibot";

const { t } = useI18n();
const route = useRoute();
const handle = computed(() => route.params.handle as string);

// TODO: throw if route.params.handle is anything else than string

const { data: product, error } = await useFetch<any>(handle, {
  baseURL: "/api/products/",
});

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const variants = computed(() => product.value.offers);
const options = computed(() => product.value.properties);
const productSizes = computed(() => options.value.size);

const formSchema = toTypedSchema(
  v.object({
    size: v.string("sheesh"),
  })
);

const onSubmit = (values: any) => {
  console.log("Form submitted!", values);
};
</script>

<template>
  <NuxtLinkLocale to="/">{{ t("welcome") }}</NuxtLinkLocale>
  <section>
    <h1>{{ product.name }}</h1>
  </section>

  <NuxtLinkLocale to="/products/hooray-for-boobies-t-shirt">
    {{ "hooray-for-boobies-t-shirt" }}
  </NuxtLinkLocale>

  <UiForm
    :validation-schema="formSchema"
    @submit="onSubmit"
    v-slot="{ values }"
  >
    <UiFormField v-slot="{ componentField }" type="radio" name="size">
      <UiFormItem class="space-y-3">
        <UiFormLabel>Sizes</UiFormLabel>
        <UiFormControl>
          <UiRadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <UiFormItem
              v-for="size in productSizes"
              class="flex items-center space-y-0 gap-x-3"
            >
              <UiFormControl>
                <UiRadioGroupItem :value="size" />
              </UiFormControl>
              <UiFormLabel class="font-normal"> {{ size }} </UiFormLabel>
            </UiFormItem>
          </UiRadioGroup>
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>

    <UiButton type="submit"> Submit </UiButton>

    <pre> {{ values }} </pre>
  </UiForm>
</template>
