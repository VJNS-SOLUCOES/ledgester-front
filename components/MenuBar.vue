<script setup lang="ts">
import type { PropType } from 'vue';

type LinksDto = {
  label: string;
  icon: string;
  functionId: string;
  to: string;
  active: boolean;
};

const props = defineProps({
  links: { type: Array as PropType<LinksDto[]>, required: true },
  pinedValue: { type: Boolean, required: true },
});
const emit = defineEmits(['update:pinedValue']);

const mouseEnterLeftBar = ref<boolean | null>(null);

const pinLeftBar = () => {
  emit('update:pinedValue', !props.pinedValue);
};
</script>
<template>
  <div
    class="bg-secondary_light overflow-hidden z-50 h-screen w-20 shadow-lg flex flex-col py-8 gap-8"
    :class="{
      'animate-open': mouseEnterLeftBar && mouseEnterLeftBar !== null,
      'animate-retract': !mouseEnterLeftBar && mouseEnterLeftBar !== null,
      absolute: pinedValue,
    }"
    v-on:mouseenter="!pinedValue ? '' : (mouseEnterLeftBar = true)"
    v-on:mouseleave="!pinedValue ? '' : (mouseEnterLeftBar = false)"
  >
    <div class="flex w-full h-[73px] gap-2 justify-center items-center">
      <img
        src="/LEDGESTER_Simbolo.png"
        class="h-10"
        :class="{ 'animate-disappear': mouseEnterLeftBar, hidden: mouseEnterLeftBar }"
      />
      <img
        src="/LEDGESTER_Logo1-transp.png"
        class="h-[60px]"
        :class="{ 'animate-appear': mouseEnterLeftBar, hidden: !mouseEnterLeftBar }"
      />
      <SideBarButton
        @handle-click="pinLeftBar()"
        :icon="pinedValue ? 'i-mdi-pin-outline' : 'i-mdi-pin-off-outline'"
        size="sm"
        :button-style="{ 'animate-appear': mouseEnterLeftBar, hidden: !mouseEnterLeftBar }"
      />
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
</template>
