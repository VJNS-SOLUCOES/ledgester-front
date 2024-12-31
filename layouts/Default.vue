<script setup lang="ts">
import { useUserStore } from '~/store';
import { watch } from 'vue';

const route = useRoute();
const userStore = useUserStore();
const mouseEnterMenu = ref<boolean | null>(null);
const menuIsPined = ref(true);
const title = ref('');
const links = ref();
const children = ref();

const pinMenu = () => {
  menuIsPined.value = !menuIsPined.value;
};

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

updateMenu();

watch([() => route.path, () => userStore.menu], updateMenu);
</script>
<template>
  <div class="bg-secondary_light-200 relative flex">
    <div
      class="bg-secondary_light z-50 h-screen w-20 shadow-lg flex flex-col py-8 gap-8"
      :class="{
        'animate-open': mouseEnterMenu && mouseEnterMenu !== null,
        'animate-retract': !mouseEnterMenu && mouseEnterMenu !== null,
        absolute: menuIsPined,
      }"
      v-on:mouseenter="!menuIsPined ? '' : (mouseEnterMenu = true)"
      v-on:mouseleave="!menuIsPined ? '' : (mouseEnterMenu = false)"
    >
      <div class="flex w-full h-[73px] gap-2 justify-center items-center">
        <NuxtImg
          src="/LEDGESTER_Simbolo.png"
          class="h-10"
          :class="{ 'animate-disappear': mouseEnterMenu, hidden: mouseEnterMenu }"
        />
        <NuxtImg
          src="/LEDGESTER_Logo1-transp.png"
          class="h-[60px]"
          :class="{ 'animate-appear': mouseEnterMenu, hidden: !mouseEnterMenu }"
        />
        <UButton
          size="sm"
          :ui="{
            rounded: 'rounded-full',
          }"
          color="white"
          @click="pinMenu()"
          square
          variant="solid"
          :class="{ 'animate-appear': mouseEnterMenu, hidden: !mouseEnterMenu }"
        >
          <template #leading>
            <UIcon
              :name="menuIsPined ? 'i-mdi-pin-outline' : 'i-mdi-pin-off-outline'"
              class="w-5 h-5 m-1 text-gray-500"
            />
          </template>
        </UButton>
      </div>
      <UVerticalNavigation
        class="[&>ul]:gap-3 [&>ul]:flex [&>ul]:flex-col"
        :ui="{
          inactive:
            'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:before:bg-secondary_light dark:hover:before:bg-gray-800/50',
          rounded: 'rounded-none',
          base: 'group relative pl-7 flex items-center gap-5 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-none disabled:cursor-not-allowed disabled:opacity-75',
          active:
            'text-gray-900 dark:text-white before:border-r-main before:border-r-4 before:bg-gray-50 dark:before:bg-gray-800',
        }"
        :links="links"
      >
        <template #icon="{ link }">
          <div class="flex">
            <UIcon :name="link.icon" class="w-6 h-6" />
          </div>
        </template>
        <template #default="{ link }">
          <span
            class="relative animate-disappear opacity-0 flex"
            :class="{
              'animate-flyin': mouseEnterMenu,
              'animate-disappear': mouseEnterMenu === false,
            }"
            >{{ link.label }}</span
          >
        </template>
      </UVerticalNavigation>
    </div>
    <div class="h-screen w-full flex-1 flex flex-col gap-10" :class="{ 'pl-20': menuIsPined }">
      <div class="p-8 gap-8 flex flex-col">
        <NavBar :title="title" :child="children" />
        <slot />
      </div>
    </div>
    <div class="bg-secondary_light h-screen w-16 shadow-lg items-center flex flex-col py-8 gap-6">
      <div class="flex w-full h-[73px] justify-center items-center">
        <UIcon name="i-material-symbols-account-circle" class="w-12 h-12 text-tertiary_light-300" />
      </div>
      <UDivider class="px-2" />
      <div class="flex flex-col items-center gap-6 py-4">
        <UButton
          size="sm"
          :ui="{
            rounded: 'rounded-full',
          }"
          color="white"
          square
          variant="solid"
        >
          <template #leading>
            <UIcon
              name="i-icon-park-outline-config"
              class="w-5 h-5 m-1 text-gray-500 hover:animate-spin"
            />
          </template>
        </UButton>
        <span class="relative">
          <UButton
            size="sm"
            :ui="{
              rounded: 'rounded-full',
            }"
            color="white"
            square
            variant="solid"
          >
            <template #leading>
              <UIcon
                name="i-ion-notifications"
                class="w-5 h-5 m-1 text-gray-500 hover:animate-shake"
              />
            </template>
          </UButton>
          <!-- <span
            class="bg-orange-500 w-[10px] h-[10px] animate-zoomIn absolute rounded-full flex top-0 right-0"
          /> -->
        </span>
      </div>
    </div>
  </div>
</template>
