<script setup lang="ts">
defineProps<{
  product: any;
  variants: any[];
  sizes: any[];
}>();

const selectedSize = defineModel({ required: true });
</script>

<template>
  <template v-if="sizes.length > 0">
    <UiFormField
      v-slot="{ componentField }"
      type="radio"
      name="size"
      v-model="selectedSize"
    >
      <UiFormItem class="space-y-3">
        <UiFormLabel>Sizes</UiFormLabel>
        <UiFormControl>
          <UiRadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <UiFormItem
              v-for="size in sizes"
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
  </template>
</template>
