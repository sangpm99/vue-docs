<template>
  <ConfirmDialog
    v-model:isDialogVisible="isDialogVisible"
    :confirmation-question="'Are you sure you want to delete this price?'"
    @confirm="(value) => confirmDelete(value)"
  ></ConfirmDialog>
</template>

<script setup lang="ts">
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";

const isDialogVisible = ref<boolean>(false);

const handleOpenDeleteDialog = (p: Price) => {
  price.value = p;
  isDialogVisible.value = true;
};

const confirmDelete = async (value: boolean) => {
  if (value && price.value && pagedResponse.value) {
    await catalogStore.deletePrice(price.value.id);
    pagedResponse.value.items = pagedResponse.value.items.filter((item) => item.id !== price.value.id);
  }
};
</script>
