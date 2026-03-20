<template>
  <StoreAutoComplete
      v-model="store"
      :key="remountStore"
      prepend-inner-icon="ri-store-2-line"
      :rules="[requiredValidator]"
      :error-messages="errors?.StoreId"
  />
</template>

<script lang="ts" setup>
import { emailValidator, requiredValidator } from "@/@core/utils/validators";
import type { StoreDetail } from "@/types/store";

const store = ref<StoreDetail>();

const handleSubmit = async () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid && store.value) {
      try {
        createOrderParams.value.storeId = store.value.id;
      ...
      }
    }
  })
}
</script>
