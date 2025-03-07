<script setup lang="ts">
interface Props {
  isDialogVisible: boolean;
}
interface Emit {
  (e: "update:isDialogVisible", value: boolean): void;
  (e: "submit", value: boolean): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const updateModelValue = (val: boolean) => {
  emit("update:isDialogVisible", val);
};

const onSubmit = () => {};

const onCancel = () => {
  updateModelValue(false);
};
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    @update:model-value="updateModelValue"
    max-width="900"
  >
    <VCard class="text-center px-10 py-6">
      <VCardText> </VCardText>

      <VCardText class="d-flex align-center justify-center gap-4">
        <VBtn variant="elevated" @click="onSubmit"> Submit </VBtn>

        <VBtn color="secondary" variant="outlined" @click="onCancel">
          Cancel
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
