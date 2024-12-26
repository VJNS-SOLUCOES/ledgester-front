<script setup lang="ts">
import { serviceRequest } from '@/utils/permission';
import type { GroupProfileDTO } from '~/types/groupProfile';

const route = useRoute();
const permissions = ref<GroupProfileDTO | undefined>({
  permissao: { can_Delete: false, can_Save: false, can_Search: false },
  particularidade: [
    { desc_parametro: '', grupO_USUARIO_PARTICUL_ID: 0, presenca_particularidade: false },
  ],
});

onMounted(() => {
  serviceRequest(route.path.slice(-1)).then((data) => {
    permissions.value = data;
  });
});
</script>
<template>
  <div class="w-full flex flex-col items-end">
    <SearchBar />
  </div>
</template>
