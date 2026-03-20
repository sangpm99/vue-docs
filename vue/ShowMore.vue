<template>
    <div class="word-break text-sm" v-if="item.newValue">
        <span>
        {{
            item.newValue &&
            item.newValue.length > 100 &&
            !expandedItems.includes(index)
            ? `${item.newValue.slice(0, 100)} ... `
            : item.newValue
        }}
        </span>
        <a @click="toggleExpand(index)" class="cursor-pointer">
        {{
            item.newValue && item.newValue.length > 100
            ? expandedItems.includes(index)
                ? " Show less"
                : " Show more"
            : ""
        }}
        </a>
    </div>
</template>

<script lang="ts" setup>
const expandedItems = ref<number[]>([]);

const toggleExpand = (index: number) => {
  const itemIndex = expandedItems.value.indexOf(index);
  if (itemIndex === -1) {
    expandedItems.value.push(index);
  } else {
    expandedItems.value.splice(itemIndex, 1);
  }
};
</script>