<template>
    <VTooltip text="Create Product">
        <template v-slot:activator="{ props }">
        <VBtn
            v-if="
            $can('Create', 'Permission.Product') &&
            $can('Read', 'Permission.ProductType')
            "
            v-bind="props"
            to="/product/create"
            color="primary"
            class="float-end rounded"
            icon="ri-add-line"
        >
        </VBtn>
        </template>
    </VTooltip>
</template>