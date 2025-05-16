<script setup lang="ts">
import { useDisplay } from "vuetify";
import { pageIndex, pageSize, pageSizeOptions, totalVisible } from "@/enums";
import { useIntegratedAccountStore } from "@/stores/integratedAccountStore";
import type { SearchQuery } from "@/types";
import type { ApiError, IntegratedAccount } from "@/types/integratedAccount";
import CreateUpdateIntegratedAccountDrawer from "@/views/apps/intergratedAccount/CreateUpdateIntegratedAccountDrawer.vue";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";

definePage({
  meta: {
    action: "Read",
    subject: "Permission.ImageConcept",
  },
});

const { xs } = useDisplay();

const headers = [
  { title: "#", key: "id" },
  { title: "Name", key: "name" },
  { title: "Provider", key: "provider" },
  { title: "Enabled", key: "isEnabled" },
  { title: "Counter Per Day", key: "counterPerDay" },
  { title: "Last Query At", key: "lastQueryTimestemp" },
  { title: "Error", key: "apiErrors" },
  { title: "Actions", key: "actions", width: "50px" },
];

const integratedAccountStore = useIntegratedAccountStore();
const searchQuery = ref<SearchQuery>({
  searchValue: "",
  pageIndex,
  pageSize,
});
const integratedAccounts = ref<IntegratedAccount[]>([]);
const itemLength = ref<number>(0);
const totalPage: Ref<number> = ref(1);
const selectedIntegratedAccount = ref<IntegratedAccount>();
const isCreateUpdateIntegratedAccountDrawerOpen = ref<boolean>(false);
const isDialogDeleteVisible = ref<boolean>(false);

const getAccounts = async () => {
  const data = await integratedAccountStore.getAccounts(searchQuery.value);
  if (data && data.items && data.items.length) {
    integratedAccounts.value = data.items;
    itemLength.value = data.itemsCount;
    totalPage.value = Math.ceil(data.itemsCount / pageSize);
  }
};

const onReset = () => {
  searchQuery.value = {
    searchValue: "",
    pageIndex,
    pageSize,
  };
  getAccounts();
};

const onOpenUpdate = (item: IntegratedAccount) => {
  selectedIntegratedAccount.value = item;
  isCreateUpdateIntegratedAccountDrawerOpen.value = true;
};

const onOpenDelete = (item: IntegratedAccount) => {
  selectedIntegratedAccount.value = item;
};

const confirmDelete = async (value: boolean) => {
  if (value && selectedIntegratedAccount.value) {
    await integratedAccountStore.deleteAccount(
      selectedIntegratedAccount.value.id,
    );
    integratedAccounts.value = integratedAccounts.value.filter(
      (item) => item.id !== selectedIntegratedAccount.value?.id!,
    );
  }
};

onMounted(() => {
  getAccounts();
});
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <div class="d-flex flex-wrap gap-4">
              <VTooltip text="Create">
                <template v-slot:activator="{ props }">
                  <VBtn
                    v-bind="props"
                    icon="mdi-plus"
                    class="rounded"
                    @click="isCreateUpdateIntegratedAccountDrawerOpen = true"
                  ></VBtn>
                </template>
              </VTooltip>

              <VSpacer></VSpacer>

              <div class="d-flex flex-wrap gap-4">
                <VTextField
                  density="compact"
                  v-model="searchQuery.searchValue"
                  label="Search"
                  @keyup.enter="getAccounts"
                  width="200"
                ></VTextField>

                <VBtn
                  icon="ri-search-line"
                  class="rounded"
                  variant="outlined"
                  @click="getAccounts"
                ></VBtn>

                <VBtn
                  variant="outlined"
                  icon="ri-filter-off-line"
                  color="error"
                  class="rounded"
                  @click="onReset"
                ></VBtn>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard>
          <VCardText>
            <VDataTableServer
              density="compact"
              :loading="integratedAccountStore.loading"
              :items="integratedAccounts"
              item-value="id"
              return-object
              :items-length="itemLength"
              :headers="headers"
              hide-default-footer
              disable-sort
            >
              <template #item.order="{ item }"> </template>

              <template #item.actions="{ item }">
                <div class="d-flex cursor-pointer">
                  <IconBtn @click="onOpenUpdate(item)">
                    <VIcon icon="ri-edit-box-line" color="primary"/>
                  </IconBtn>

                  <IconBtn @click="onOpenDelete(item)">
                    <VIcon icon="ri-delete-bin-7-line" color="error" />
                  </IconBtn>
                </div>
              </template>

              <template #bottom>
                <PaginationFrame>
                  <template #pageSize>
                    <VSelect
                      v-model="searchQuery.pageSize"
                      :items="pageSizeOptions"
                      variant="outlined"
                      density="compact"
                      @update:model-value="getAccounts"
                    />
                  </template>

                  <template #pagination>
                    <VPagination
                      v-model="searchQuery.pageIndex"
                      :length="totalPage"
                      :total-visible="xs ? 1 : totalVisible"
                      @update:model-value="getAccounts"
                    />
                  </template>
                </PaginationFrame>
              </template>
            </VDataTableServer>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <CreateUpdateIntegratedAccountDrawer
      v-model:is-drawer-open="isCreateUpdateIntegratedAccountDrawerOpen"
      :integrated-account="selectedIntegratedAccount"
      @submit="getAccounts"
    ></CreateUpdateIntegratedAccountDrawer>

    <ConfirmDialog
      v-model:isDialogVisible="isDialogDeleteVisible"
      :confirmation-question="'Are you sure you want to delete this integrated account?'"
      @confirm="(value) => confirmDelete(value)"
    ></ConfirmDialog>
  </section>
</template>
