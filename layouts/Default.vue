<script setup lang="ts">
import { useUserStore } from '~/store';

const userStore = useUserStore();
const mouseEnterMenu = ref(false);

const links = userStore.menu?.map((element) => {
  return {
    label: element.desc_Tab_Tipo_Funcao,
    icon: element.icon,
    functionTypeId: element.tab_Tipo_Funcao,
    childrens: element.childrens,
  };
});
</script>
<template>
  <div class="bg-secondary_light-200">
    <div
      class="bg-secondary_light w-20 h-screen shadow-lg flex flex-col py-8 gap-8"
      :class="mouseEnterMenu ? 'animate-open' : 'animate-retract'"
      v-on:mouseenter="mouseEnterMenu = true"
      v-on:mouseleave="mouseEnterMenu = false"
    >
      <div class="flex w-full h-[60px] justify-center">
        <NuxtImg
          src="/LEDGESTER_Simbolo.png"
          sizes="40px"
          class="pt-[10px] pb-[10px]"
          :class="{ 'animate-disappear': mouseEnterMenu, hidden: mouseEnterMenu }"
        />
        <NuxtImg
          src="/LEDGESTER_Logo1-transp.png"
          sizes="170"
          :class="{ 'animate-appear': mouseEnterMenu, hidden: !mouseEnterMenu }"
        />
      </div>
      <UVerticalNavigation
        class="[&>ul]:gap-2 [&>ul]:flex [&>ul]:flex-col"
        :ui="{
          inactive:
            'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:before:bg-secondary_light dark:hover:before:bg-gray-800/50',
          rounded: 'rounded-none',
          base: 'group relative pl-[34px] flex items-center gap-5 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-none disabled:cursor-not-allowed disabled:opacity-75',
          active:
            'text-gray-900 dark:text-white before:border-r-main before:border-r-4 before:bg-gray-50 dark:before:bg-gray-800',
        }"
        :links="links"
      >
        <template #icon="{ link }">
          <div>
            <UIcon :name="link.icon" class="w-6 h-6" />
          </div>
        </template>
        <template #default="{ link }">
          <span
            class="relative"
            :class="{ 'animate-appear': mouseEnterMenu, 'animate-disappear': !mouseEnterMenu }"
            >{{ link.label }}</span
          >
        </template>
      </UVerticalNavigation>
    </div>
  </div>
</template>
