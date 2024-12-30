<template>
  <VNavigationDrawer
      :model-value="props.isDrawerOpen"
      location="end"
      width="800"
      temporary
      border="none"
      class="scrollable-content"
      order="10"
      @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- replace -->
    <AppDrawerHeaderSection
        title=""
        @cancel="handleDrawerModelValueUpdate(false)"
    >
      <template #beforeClose>
        <VBtn
            form="form"
            type="submit"
            color="primary"
            class="me-4"
            :loading="loading"
            size="small"
        >
          Submit
        </VBtn>
      </template>
    </AppDrawerHeaderSection>

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm id="form" ref="refForm" @submit.prevent="handleSubmit">
            <VRow>
              <VCol cols="12">
                <!-- Replace -->
                <VTextField
                    v-model="buyerEmail"
                    density="compact"
                    label="Buyer Email"
                    prepend-inner-icon="ri-mail-line"
                    placeholder="johndoe@gmail.com"
                    :rules="[requiredValidator, emailValidator]"
                    :error-messages="errors?.BuyerEmail"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>

  <VSnackbar v-model="isSnackbarVisible" location="top" :timeout="3000" close>
    {{ message }}
  </VSnackbar>
</template>

<script lang="ts" setup>

//// Important: Change id form first




import { emailValidator, requiredValidator } from "@/@core/utils/validators";
import { useNavigationDrawerEscHandler } from "@/composables";
import type { ErrorResponse } from "@/types";
import type { ValidateErrors } from "@/types/accounts/users";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { VForm } from "vuetify/components/VForm";

// 👉 Props & Emits
interface Props {
  isDrawerOpen: boolean;
}
interface Emit {
  (e: "update:isDrawerOpen", value: boolean): void;
  (e: "update:submit", value: boolean): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

// 👉 Stores

// 👉 States
const loading: Ref<boolean> = ref(false)
// replace
const buyerEmail: Ref<string> = ref("");

/// notify
const refForm = ref<VForm>();
const errors: Ref<ValidateErrors | null> = ref(null);
const isSnackbarVisible: Ref<boolean> = ref(false);
const message: Ref<string> = ref("");

// 👉 Functions
const handleReset = () => {
  refForm.value?.reset();
  refForm.value?.resetValidation();
};

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit("update:isDrawerOpen", val);
};

const handleSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        // ... api
        handleDrawerModelValueUpdate(false);
        emit("update:submit", true);
        message.value = "Successfully";
        isSnackbarVisible.value = true;
      } catch (error) {
        const { response } = error as ErrorResponse<ValidateErrors>;
        const { data, status } = response;
        if (status === 400) {
          errors.value = data.errors || null;
        }
        message.value = data.title || "Something went wrong.";
        isSnackbarVisible.value = true;
      }
    }
  });
};

// type esc to close drawer
useNavigationDrawerEscHandler("Escape", () =>
    handleDrawerModelValueUpdate(false)
);

watch(
    () => props.isDrawerOpen,
    () => {
      if (props.isDrawerOpen) {
        handleReset();
        tracking.value = {
          trackingCarrier: props.trackingCarrier ?? "",
          trackingNumber: props.trackingNumber ?? "",
        };
      }
    }
);
</script>
