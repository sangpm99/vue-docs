<template>
    <VAutocomplete
      label="Select Catalog Design"
      density="compact"
      placeholder="Hoodie"
      clearable
      :items="pagedResponse ? pagedResponse.items : []"
      item-title="name"
      item-value="id"
      return-object
      :loading="catalogDesignStore.loading"
      v-model="catalog"
      @update:model-value="updateModelValue"
      @update:search="searchQuery.searchValue = $event"
      @click:clear="clearFilter"
      @keydown.enter="getCatalogs"
      :custom-filter="() => true"
    >
    </VAutocomplete>
  </template>
  
  <script lang="ts" setup>
  import { pageIndex, pageSizeOption } from "@/enums";
  import {useCatalogDesignStore} from "@/stores/catalogDesignStore";
  import type {SearchQuery, PagedResponse} from "@/types";
  import type {Catalog} from "@/types/catalogDesign";
  
  // Props & Emits
  interface Props {
    modelValue?: Catalog;
  }
  interface Emit {
    (e: "update:modelValue", value: Catalog | null): void;
  }
  const props = defineProps<Props>();
  const emit = defineEmits<Emit>();
  
  // Stores
  const catalogDesignStore = useCatalogDesignStore();
  
  // States
  const pagedResponse = ref<PagedResponse<Catalog, string>>();
  const searchQuery: Ref<SearchQuery> = ref({
    searchValue: "",
    pageIndex: pageIndex,
    pageSize: pageSizeOption,
  });
  const catalog = ref<Catalog>();
  
  // Functions
  const getCatalogs = async() => {
    pagedResponse.value = await catalogDesignStore.getCatalogs(searchQuery.value);
  }
  
  const clearFilter = async () => {
    searchQuery.value = {
      searchValue: "",
      pageIndex: pageIndex,
      pageSize: pageSizeOption,
    };
    await getCatalogs();
  };
  
  const updateModelValue = (value: Catalog) => {
    catalog.value = value;
    emit("update:modelValue", value);
  };
  
  // Functions
  onMounted(async () => {
    catalog.value = props.modelValue;
    await getCatalogs();
  });
  </script>
  