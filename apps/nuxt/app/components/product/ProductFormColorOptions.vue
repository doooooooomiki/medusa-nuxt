<script setup lang="ts">
defineProps<{
  product: any;
  variants: any[];
  colors: any[];
}>();

const selectedColor = defineModel({ required: true });
</script>

<template>
  <template v-if="colors.length > 0">
    <UiFormField
      v-slot="{ componentField }"
      type="radio"
      name="color"
      v-model="selectedColor"
    >
      <UiFormItem class="space-y-3">
        <UiFormLabel>Colors</UiFormLabel>
        <UiFormControl>
          <UiRadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <UiFormItem
              v-for="color in colors"
              class="flex items-center space-y-0 gap-x-3"
            >
              <UiFormControl>
                <UiRadioGroupItem :value="color" />
              </UiFormControl>
              <UiFormLabel class="font-normal"> {{ color }} </UiFormLabel>
            </UiFormItem>
          </UiRadioGroup>
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
  </template>
</template>
