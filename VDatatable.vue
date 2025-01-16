<template>
    <VDataTableServer
        :loading="orderStore.loading"
        :items="pagedResponse ? pagedResponse.items : []"
        item-value="id"
        :items-length="pagedResponse ? pagedResponse.itemsCount : 0"
        :headers="headers"
        hide-default-footer
        show-select
        hover
        disable-sort
        v-model="selectedOrder"
    >
        <template #item.order="{ item }">
        </template>

        <template #item.actions="{ item }">
            <div class="d-flex cursor-pointer">
                <IconBtn
                >
                <VIcon icon="ri-edit-box-line" color="warning"/>
                </IconBtn>

                <IconBtn
                >
                <VIcon icon="ri-delete-bin-7-line" color="error"/>
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
                    @update:model-value="getOrders"
                />
                </template>

                <template #pagination>
                <VPagination
                    v-model="searchQuery.pageIndex"
                    :length="totalPage"
                    :total-visible="xs ? 1 : totalVisible"
                    @update:model-value="getOrders"
                />
                </template>
            </PaginationFrame>
        </template>
    </VDataTableServer>
</template>

<script lang="ts" setup>
import PaginationFrame from "@/components/PaginationFrame.vue";
import {pageIndex, pageSize, pageSizeOptions, totalVisible} from "@/enums";

import {useDisplay} from "vuetify";

const {xs} = useDisplay();

const headers = [
  {title: "#", key: "id"},
  {title: "Name", key: "name"},
  {title: "Rating", key: "stars"},
  {title: "Products", key: "products"},
  {title: "Description", key: "description"},
  {title: "Actions", key: "actions", width: "50px"}
];

const totalPage: Ref<number> = ref(1);

totalPage.value = Math.ceil(
    orders.value.itemsCount / orders.value.pageSize
);
</script>