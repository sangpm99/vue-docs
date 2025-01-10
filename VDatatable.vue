<template>
    <VDataTableServer
        :loading="orderStore.loaadin"
        :items="orders ? orders.items : []"
        item-value="id"
        :items-length="orders ? orders.itemsCount : 0"
        :headers="headers"
        hide-default-footer
        show-select
        hover
        disable-sort
        v-model="selectedOrder"
    >
        <template #item.order="{ item }">
        </template>
</VDataTableServer>
</template>

<script lang="ts" setup>
import PaginationFrame from "@/components/PaginationFrame.vue";
import {pageIndex, pageSize, pageSizeOptions, totalVisible} from "@/enums"

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