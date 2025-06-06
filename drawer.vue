

<script lang="ts" setup>

//// Important: Change id form first
import { requiredValidator } from "@/@core/utils/validators";
import { useNavigationDrawerEscHandler } from "@/composables";
import type { ErrorResponse } from "@/types";
import type { ValidateErrors } from "@/types/accounts/users";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { VForm } from "vuetify/components/VForm";
import Alert from "@/components/Alert.vue";

interface Props {
  isDrawerOpen: boolean;
}
interface Emit {
  (e: "update:isDrawerOpen", value: boolean): void;
  (e: "submit"): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();


const loading: Ref<boolean> = ref(false)
// replace
const buyerEmail: Ref<string> = ref("");

/// notify
const refForm = ref<VForm>();
const errors = ref<ValidateErrors | null>(null);
const isSnackbarVisible = ref<boolean>(false);
const message = ref<string>("");
const messageType = ref<string>("error");

const handleReset = () => {
  nextTick(() => {
    refForm.value?.reset();
    refForm.value?.resetValidation();
  });
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
        emit("submit");
        message.value = "Successfully";
        isSnackbarVisible.value = true;
        messageType.value = "success";
        handleReset();
      } catch (error) {
        const { response } = error as ErrorResponse<ValidateErrors>;
        const { data, status } = response;
        errors.value = data.errors || null;
        message.value = data.title || "Something went wrong.";
        if (status === 400) {
          if (data.errors) {
            Object.entries(data.errors).forEach(([key, value]) => {
              message.value = `${key}: ${value}`;
            });
          }
        } 
        isSnackbarVisible.value = true;
        messageType.value = "error";
      }
    }
  });
};

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
      <VCard flat v-if="props.isDrawerOpen">
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

  <Alert
    v-model:is-visible="isSnackbarVisible"
    :message="message"
    :type="messageType"
  ></Alert>
</template>