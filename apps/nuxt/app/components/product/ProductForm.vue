<script setup lang="ts">
import * as v from "valibot";
import { toTypedSchema } from "@vee-validate/valibot";

const props = defineProps<{
  product: any;
  variants: any[];
  options: any[];
}>();

const route = useRoute();
const router = useRouter();
const variantQuery = computed(() => route.query.variant as string);

const selectedSize = ref("");
const selectedColor = ref("");

const initialVariant = ref<any | undefined>();

const currentVariant = computed(() =>
  props.variants.find((variant) =>
    variant.properties.every(
      ({ name, value }: { name: string; value: string }) => {
        if (name === "size") return value === selectedSize.value;
        if (name === "color") return value === selectedColor.value;
      }
    )
  )
);

const setVariantId = (variant: any | undefined) => {
  const query = { ...route.query };

  if (variant) {
    query.variant = variant.id;
  } else {
    delete query.variant;
  }

  router.replace({ query });
};

watch(currentVariant, (newVariant) => {
  setVariantId(newVariant);
});

const sizes = computed(() => {
  if (props.options.length === 0) return [];

  const sizes = props.options.find(
    (option: { name: string }) => option.name === "size"
  );

  return !sizes ? [] : sizes.values;
});

const colors = computed(() => {
  if (props.options.length === 0) return [];

  const colors = props.options.find(
    (option: { name: string }) => option.name === "color"
  );

  return !colors ? [] : colors.values;
});

const formSchema = toTypedSchema(
  v.object({
    size: v.string("sheesh"),
    color: v.string("sheesh"),
  })
);

const onSubmit = (values: any) => {
  console.log("Form submitted!", values);
};

onMounted(() => {
  if (props.variants.length === 1) {
    initialVariant.value = props.variants.at(0);
  } else if (variantQuery.value) {
    initialVariant.value = props.variants.find(
      (variant) => variant.id === Number.parseInt(variantQuery.value)
    );
  }

  if (initialVariant.value) {
    const sizeOption = initialVariant.value.properties.find(
      (property: any) => property.name === "size"
    );

    if (sizeOption) {
      selectedSize.value = sizeOption.value;
    }

    const colorOption = initialVariant.value.properties.find(
      (property: any) => property.name === "color"
    );

    if (colorOption) {
      selectedColor.value = colorOption.value;
    }

    setVariantId(initialVariant.value);
  }
});
</script>

<template>
  <UiForm
    :validation-schema="formSchema"
    @submit="onSubmit"
    v-slot="{ values }"
  >
    <ProductFormSizeOptions
      :product="product"
      :variants="variants"
      :sizes="sizes"
      v-model="selectedSize"
    />

    <ProductFormColorOptions
      :product="product"
      :variants="variants"
      :colors="colors"
      v-model="selectedColor"
    />

    <UiButton type="submit"> Submit </UiButton>
  </UiForm>
</template>
