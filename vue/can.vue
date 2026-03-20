<script lang="ts" setup>
import { useAbility } from "@casl/vue";

const { can } = useAbility();

if(can('Delete','Permission.Product')) {
    await fileUploadStore.deleteFile(mockupTheme.value.imageURL);
}
</script>