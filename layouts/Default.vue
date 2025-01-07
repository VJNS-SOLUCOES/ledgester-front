<script setup lang="ts">
import { useUserStore } from '~/store';
import { watch } from 'vue';

const colorMode = useColorMode();

const route = useRoute();
const userStore = useUserStore();

const mouseEnterLeftBar = ref<boolean | null>(null);
const openRightBar = ref<boolean | null>(null);
const leftBarIsPined = ref<boolean>(true);
const openConfigPanel = ref<boolean>(false);
const darkTheme = ref<boolean>(colorMode.preference === 'dark');
const title = ref<string>('');
const animate = ref<boolean>(false);

const links = ref();
const children = ref();

const pinLeftBar = () => {
  leftBarIsPined.value = !leftBarIsPined.value;
};

const handleColorMode = () => {
  colorMode.preference = darkTheme.value ? 'dark' : 'light';
};

const logout = () => {
  navigateTo('/');
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

const handleOpenConfigPanel = () => {
  if (openRightBar.value) {
    if (openConfigPanel.value) {
      openConfigPanel.value = false;
      return;
    }
    openConfigPanel.value = true;
    return;
  }
  openRightBar.value = true;
  openConfigPanel.value = true;
};

onMounted(() => {
  updateMenu();
});

watch([() => route.path, () => userStore.menu], updateMenu);

watch(openRightBar, () => {
  animate.value = true;
});
</script>
<template>
  <div class="bg-secondary_light-200 overflow-hidden relative flex">
    <div
      class="bg-secondary_light z-50 h-screen w-20 shadow-lg flex flex-col py-8 gap-8"
      :class="{
        'animate-open': mouseEnterLeftBar && mouseEnterLeftBar !== null,
        'animate-retract': !mouseEnterLeftBar && mouseEnterLeftBar !== null,
        absolute: leftBarIsPined,
      }"
      v-on:mouseenter="!leftBarIsPined ? '' : (mouseEnterLeftBar = true)"
      v-on:mouseleave="!leftBarIsPined ? '' : (mouseEnterLeftBar = false)"
    >
      <div class="flex w-full h-[73px] gap-2 justify-center items-center">
        <NuxtImg
          src="/LEDGESTER_Simbolo.png"
          class="h-10"
          :class="{ 'animate-disappear': mouseEnterLeftBar, hidden: mouseEnterLeftBar }"
        />
        <NuxtImg
          src="/LEDGESTER_Logo1-transp.png"
          class="h-[60px]"
          :class="{ 'animate-appear': mouseEnterLeftBar, hidden: !mouseEnterLeftBar }"
        />
        <UButton
          size="sm"
          :ui="{
            rounded: 'rounded-full',
          }"
          color="white"
          @click="pinLeftBar()"
          square
          variant="solid"
          :class="{ 'animate-appear': mouseEnterLeftBar, hidden: !mouseEnterLeftBar }"
        >
          <template #leading>
            <UIcon
              :name="leftBarIsPined ? 'i-mdi-pin-outline' : 'i-mdi-pin-off-outline'"
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
              'animate-flyin': mouseEnterLeftBar,
              'animate-disappear': mouseEnterLeftBar === false,
            }"
            >{{ link.label }}</span
          >
        </template>
      </UVerticalNavigation>
    </div>
    <div
      class="h-screen w-full flex-1 flex flex-col gap-10 pr-16"
      :class="{ 'pl-20': leftBarIsPined }"
    >
      <div class="p-8 gap-8 flex flex-col">
        <NavBar :title="title" :child="children" />
        <slot />
      </div>
    </div>
    <div
      class="bg-secondary_light h-screen w-16 z-50 shadow-lg items-center absolute right-0 flex flex-col py-6 gap-4"
      :class="{
        'animate-openRightBar': openRightBar,
        'animate-retractRightBar': openRightBar === false,
        'shadow-2xl': openRightBar,
      }"
    >
      <div class="relative h-full w-full">
        <div
          class="h-full w-full flex flex-col absolute"
          :class="{ 'animate-disappear': openConfigPanel }"
        >
          <div v-if="openRightBar" class="px-2 flex justify-end w-full">
            <UButton
              variant="ghost"
              size="xs"
              padding="2xs"
              class="text-tertiary_light"
              @click="openRightBar = false"
            >
              <template #trailing>
                <UIcon name="i-material-symbols-arrow-forward" class="w-6 h-6" />
              </template>
            </UButton>
          </div>
          <div
            class="flex flex-col w-full items-center"
            :class="{ 'animate-appear': animate, 'gap-10': openRightBar, 'gap-4': !openRightBar }"
            @animationend="animate = false"
          >
            <div
              class="flex flex-col"
              :class="{ 'animate-appear': animate, 'gap-1': openRightBar, 'gap-4': !openRightBar }"
            >
              <div class="flex w-full h-[73px] justify-center items-center">
                <UIcon
                  name="i-material-symbols-account-circle"
                  class="w-12 h-12 text-tertiary_light-300 cursor-pointer"
                  :class="{ 'w-16 h-16': openRightBar }"
                  @click="openRightBar = true"
                />
              </div>
              <UDivider v-if="!openRightBar" class="px-2" />
              <div v-if="openRightBar" class="text-secondary_dark font-semibold">
                <p>{{ userStore.user?.nomeUsuario.replace('.', ' ') }}</p>
              </div>
            </div>
            <div class="flex items-center gap-6 py-4" :class="{ 'flex-col': !openRightBar }">
              <UButton
                :size="openRightBar ? 'xl' : 'sm'"
                :ui="{
                  rounded: 'rounded-full',
                }"
                color="white"
                square
                variant="solid"
                @click="handleOpenConfigPanel()"
              >
                <template #leading>
                  <UIcon
                    name="i-icon-park-outline-config"
                    class="w-5 h-5 m-1 text-gray-500 hover:animate-spin"
                  />
                </template>
              </UButton>
              <!-- <span class="relative">
                <UButton
                  :size="openRightBar ? 'xl' : 'sm'"
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
                <span
                  class="bg-orange-500 w-[10px] h-[10px] animate-zoomIn absolute rounded-full flex top-0 right-0"
                />
              </span> -->
            </div>
          </div>
        </div>
        <div
          class="h-full w-full absolute flex flex-col z-50"
          :class="{ 'animate-appear': openConfigPanel, hidden: !openConfigPanel }"
        >
          <div class="pr-2 pb-2 pl-6 items-center flex justify-between w-full">
            <p class="text-lg font-bold text-tertiary_light">Configurações</p>
            <UButton
              variant="ghost"
              size="xs"
              padding="2xs"
              class="text-tertiary_light"
              @click="handleOpenConfigPanel()"
            >
              <template #trailing>
                <UIcon name="i-ic-round-close" class="w-6 h-6" />
              </template>
            </UButton>
          </div>
          <UAccordion
            :items="[
              {
                label: 'Dados Pessoais',
                content: {
                  fullName: userStore.user?.nomeUsuario.replace('.', ' '),
                  email: userStore.user?.email,
                  userName: userStore.user?.nomeUsuario,
                },
                icon: 'i-material-symbols-account-circle',
                slot: 'personal-data',
              },
              {
                label: 'Alterar senha',
                slot: 'change-password',
                icon: 'i-uil-padlock',
              },
              {
                label: 'Tema',
                slot: 'theme',
                icon: 'i-solar-pallete-2-outline',
              },
            ]"
            :ui="{ wrapper: 'flex flex-col w-full' }"
          >
            <template #default="{ item, index, open }">
              <UButton
                color="gray"
                variant="ghost"
                class="hover:bg-white hover:text-tertiary_light border-t border-gray-100 pl-0 pr-4 text-gray-500"
                :class="{ 'text-tertiary_light': open }"
                :ui="{ rounded: 'rounded-none', padding: { sm: 'py-3' } }"
              >
                <span
                  class="truncate border-l-4 pl-5 py-2 font-bold flex gap-5 items-center"
                  :class="{ 'border-l-main': open, 'border-l-white': !open }"
                >
                  <UIcon :name="item.icon" class="w-5 h-5" />
                  {{ item.label }}</span
                >

                <template #trailing>
                  <UIcon
                    name="i-heroicons-chevron-right-20-solid"
                    class="w-5 h-5 ms-auto transform transition-transform duration-200"
                    :class="[open && 'rotate-90']"
                  />
                </template>
              </UButton>
            </template>
            <template #personal-data="{ item, index, open, close }">
              <div class="flex flex-col px-7 gap-6">
                <div class="gap-5 flex flex-col text-center">
                  <UFormGroup size="lg">
                    <template #label>
                      <p class="text-xs font-semibold mb-2">Nome Completo</p>
                    </template>
                    <UInput disabled :model-value="item.content.fullName" />
                  </UFormGroup>
                  <UFormGroup size="lg">
                    <template #label>
                      <p class="text-xs font-semibold mb-2">Nome de Usuário</p>
                    </template>
                    <UInput disabled :model-value="item.content.userName" />
                  </UFormGroup>
                  <UFormGroup size="lg">
                    <template #label>
                      <p class="text-xs font-semibold mb-2">Email</p>
                    </template>
                    <UInput disabled :model-value="item.content.email" />
                  </UFormGroup>
                </div>
                <div class="flex justify-between">
                  <UButton
                    class="border-2 border-white hover:border-gray-400 bg-white"
                    color="black"
                    variant="ghost"
                    label="Cancelar"
                    @click="close()"
                  />
                  <UButton
                    disabled
                    class="text-main disabled:opacity-60 enabled:hover:bg-main enabled:hover:text-white border-2 border-main"
                    variant="ghost"
                    label="Alterar"
                  />
                </div>
              </div>
            </template>
            <template #change-password="{ item, index, open, close }">
              <div class="flex flex-col px-7 gap-6">
                <div class="gap-5 flex flex-col text-center">
                  <UFormGroup size="lg">
                    <template #label>
                      <p class="text-xs font-semibold mb-2">Senha Atual</p>
                    </template>
                    <UInput type="password" />
                  </UFormGroup>
                  <UFormGroup size="lg">
                    <template #label>
                      <p class="text-xs font-semibold mb-2">Nova Senha</p>
                    </template>
                    <UInput type="password" />
                  </UFormGroup>
                  <UFormGroup size="lg">
                    <template #label>
                      <p class="text-xs font-semibold mb-2">Confirmar nova senha</p>
                    </template>
                    <UInput type="password" />
                  </UFormGroup>
                </div>
                <div class="flex justify-between">
                  <UButton
                    class="border-2 border-white hover:border-gray-400 bg-white"
                    color="black"
                    variant="ghost"
                    label="Cancelar"
                    @click="close()"
                  />
                  <UButton
                    disabled
                    class="text-main disabled:opacity-60 enabled:hover:bg-main enabled:hover:text-white border-2 border-main"
                    variant="ghost"
                    label="Alterar"
                  />
                </div>
              </div>
            </template>
            <template #theme>
              <div class="px-7">
                <div
                  class="text-tertiary_light font-bold flex rounded-xl px-7 py-5 bg-gray-100 justify-between"
                >
                  <p>Ativar Modo Dark</p>
                  <UToggle
                    :ui="{ active: 'dark:bg-main' }"
                    @change="handleColorMode()"
                    v-model="darkTheme"
                    disabled
                  />
                </div>
              </div>
            </template>
          </UAccordion>
          <div
            class="px-6 flex items-center gap-5 py-5 border-t border-gray-100 text-gray-500 font-bold hover:text-tertiary_light cursor-pointer"
            @click="logout()"
          >
            <UIcon class="w-5 h-5 rotate-180" name="i-ion-exit-outline" />
            <p>Sair</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
