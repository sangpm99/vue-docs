<template></template>

<script setup lang="ts">
import { useAbility } from "@casl/vue";

// Configs
const { can } = useAbility();

definePage({
  meta: {
    action: "Read",
    subject: "Permission.Public",
  },
});

</script>