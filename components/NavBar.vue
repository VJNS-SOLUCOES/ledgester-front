<script setup lang="ts">
type ChildDto = {
  label: string;
  icon: string;
  functionId: string;
  to: string;
  active: boolean;
};

const props = defineProps({
  title: { type: String, required: true },
  child: { type: Array as PropType<ChildDto[]>, required: true },
});
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="bg-white w-full px-2 rounded-lg shadow-card">
      <UHorizontalNavigation
        :ui="{
          active:
            'text-white hover:before:bg-main-200 dark:text-white before:bg-main dark:before:bg-gray-800',
          base: 'group relative flex items-center focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px disabled:cursor-not-allowed disabled:opacity-75',
        }"
        :links="props.child"
      >
        <template #icon="{ link }">
          <div class="flex">
            <UIcon :name="link.icon" class="w-6 h-6" />
          </div>
        </template>
      </UHorizontalNavigation>
    </div>
  </div>
</template>
