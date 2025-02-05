<script setup lang="ts">
import { useUserStore } from '~/store';
import { watch } from 'vue';

const route = useRoute();
const userStore = useUserStore();

const title = ref<string>('');
const leftBarIsPined = ref<boolean>(true);

const links = ref();
const children = ref();

const updateMenu = () => {
  links.value = userStore.menu?.map((element) => {
    const isActive = route.path.includes(element.rotaPaiFront);

    return {
      label: element.desc_Tab_Tipo_Funcao,
      icon: element.icon,
      functionTypeId: element.tab_Tipo_Funcao,
      childrens: element.childrens,
      to: `${element.rotaPaiFront}${element.childrens[0].rotaFront}`,
      active: isActive,
    };
  });

  children.value = userStore.menu?.flatMap((element) => {
    const child = route.path.includes(element.rotaPaiFront) ? element.childrens : [];

    return child.flatMap((childElement) => {
      const isActive = route.path.includes(childElement.rotaFront);
      return {
        label: childElement.desc_Funcao,
        icon: childElement.icon_Funcao,
        functionId: childElement.funcaoId,
        to: `${element.rotaPaiFront}${childElement.rotaFront}`,
        active: isActive,
      };
    });
  });

  title.value =
    userStore.menu?.find((element) => route.path.includes(element.rotaPaiFront))
      ?.desc_Tab_Tipo_Funcao || '';
};

onMounted(() => {
  updateMenu();
});

watch([() => route.path, () => userStore.menu], updateMenu);
</script>
<template>
  <div class="bg-secondary_light-200 overflow-hidden relative flex">
    <MenuBar :links="links" v-model:pined-value="leftBarIsPined" />
    <div
      class="h-screen w-full flex-1 flex flex-col gap-10 pr-16"
      :class="{ 'pl-20': leftBarIsPined }"
    >
      <div class="p-8 gap-8 h-full overflow-y-auto flex flex-col">
        <NavBar :title="title" :child="children" />
        <slot />
      </div>
    </div>
    <ConfigBar :user-data="userStore.user!" />
  </div>
</template>
