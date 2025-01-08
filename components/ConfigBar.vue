<script setup lang="ts">
import type { PropType } from 'vue';
import type { UserDto } from '~/types';

defineProps({
  userData: { type: Object as PropType<Omit<UserDto, 'menu' | 'token'>>, required: true },
});

const colorMode = useColorMode();

const open = ref<boolean | null>(null);
const darkTheme = ref<boolean>(colorMode.preference === 'dark');
const openConfigPanel = ref<boolean>(false);
const animate = ref<boolean>(false);

const handleOpenConfigPanel = () => {
  if (open.value) {
    if (openConfigPanel.value) {
      openConfigPanel.value = false;
      return;
    }
    openConfigPanel.value = true;
    return;
  }
  open.value = true;
  openConfigPanel.value = true;
};

const handleColorMode = () => {
  colorMode.preference = darkTheme.value ? 'dark' : 'light';
};

const logout = () => {
  navigateTo('/');
};

watch(open, () => {
  animate.value = true;
});
</script>
<template>
  <div
    class="bg-secondary_light h-screen w-16 z-50 shadow-lg items-center absolute right-0 flex flex-col py-6 gap-4"
    :class="{
      'animate-openRightBar': open,
      'animate-retractRightBar': open === false,
      'shadow-2xl': open,
    }"
  >
    <div class="relative h-full w-full">
      <div
        class="h-full w-full flex flex-col absolute"
        :class="{ 'animate-disappear': openConfigPanel }"
      >
        <div v-if="open" class="px-2 flex justify-end w-full">
          <UButton
            variant="ghost"
            size="xs"
            padding="2xs"
            class="text-tertiary_light"
            @click="open = false"
          >
            <template #trailing>
              <UIcon name="i-material-symbols-arrow-forward" class="w-6 h-6" />
            </template>
          </UButton>
        </div>
        <div
          class="flex flex-col w-full items-center"
          :class="{ 'animate-appear': animate, 'gap-10': open, 'gap-4': !open }"
          @animationend="animate = false"
        >
          <div
            class="flex flex-col"
            :class="{ 'animate-appear': animate, 'gap-1': open, 'gap-4': !open }"
          >
            <div class="flex w-full h-[73px] justify-center items-center">
              <UIcon
                name="i-material-symbols-account-circle"
                class="w-12 h-12 text-tertiary_light-300 cursor-pointer"
                :class="{ 'w-16 h-16': open }"
                @click="open = true"
              />
            </div>
            <UDivider v-if="!open" class="px-2" />
            <div v-if="open" class="text-secondary_dark font-semibold">
              <p>{{ userData.nomeUsuario.replace('.', ' ') }}</p>
            </div>
          </div>
          <div class="flex items-center gap-6 py-4" :class="{ 'flex-col': !open }">
            <SideBarButton
              :size="open ? 'xl' : 'sm'"
              icon="i-icon-park-outline-config"
              animation="animate-spin"
              @handle-click="handleOpenConfigPanel()"
            />
            <span class="relative">
              <SideBarButton
                :size="open ? 'xl' : 'sm'"
                icon="i-ion-notifications"
                animation="animate-shake"
              />
              <span
                class="bg-orange-500 w-[10px] h-[10px] animate-zoomIn absolute rounded-full flex top-0 right-0"
              />
            </span>
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
                fullName: userData.nomeUsuario.replace('.', ' '),
                email: userData.email,
                userName: userData.nomeUsuario,
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
</template>
