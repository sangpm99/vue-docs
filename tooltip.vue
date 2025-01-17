<VTooltip text="Create Role">
    <template v-slot:activator="{props}">
      <VBtn
        v-if="can('Create', 'Permission.Role')"
        v-bind="props"
        class="rounded"
        icon="mdi-plus"
        @click="isCreateDrawerOpen = true"
      >
      </VBtn>
    </template>
  </VTooltip>