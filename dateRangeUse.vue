<template>
    <DateRangeSelect
        v-model:from="from"
        v-model:to="to"
        :key="remount"
    ></DateRangeSelect>
</template>

<script setup lang="ts">
import DateRangeSelect from "@/components/selects/DateRangeSelect.vue";

const from: Ref<number | null> = ref(null);
const to: Ref<number | null> = ref(null);
const remount = ref<number>(0);

const get = async () => {
  searchQuery.value.from = from.value;
  searchQuery.value.to = to.value;
  // api
};

const clear = () => {
  from.value = null;
  to.value = null;
  get();
  remount.value++;
};
</script>