<script setup lang="ts">
// const items = [
//   {
//     label: 'Utilities',
//     icon: 'i-heroicons-wrench-screwdriver',
//     content:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
//   },
// ];
</script>
<template>
  <!-- <div class="w-full shadow-card rounded-xl">
    <UAccordion :items="items" :ui="{ wrapper: 'flex flex-col w-full' }">
      <template #default="{ item, index, open }">
        <UInput
          :ui="{
            icon: { trailing: { pointer: '' } },
            rounded: 'rounded-lg',
            size: { xl: 'text-xl' },
            color: {
              white: {
                outline:
                  'shadow-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-0 ring-inset ring-gray-300 dark:ring-gray-700 focus:shadow-card_bold focus:ring-0 dark:focus:ring-primary-400',
              },
            },
          }"
          placeholder="Pesquisar"
          size="xl"
        >
          <template #trailing>
            <div class="flex gap-4 h-full py-2">
              <UDivider orientation="vertical" />
              <UCheckbox
                :ui="{
                  inner: 'ms-3 flex flex-col self-center',
                  color: 'text-main dark:text-main',
                  base: 'h-3 w-3 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
                }"
                class="self-center"
              >
                <template #label>
                  <span class="text-xs text-main-300">Aplicar Filtros</span>
                </template></UCheckbox
              >
              <UDivider orientation="vertical" />
              <UButton
                color="gray"
                variant="link"
                icon="i-material-symbols-search-rounded"
                :padded="false"
                @click="console.log('teste')"
              />
            </div>
          </template>
        </UInput>
      </template>
    </UAccordion>
  </div> -->
  <div class="w-full shadow-card rounded-xl">
    <UInput
      :ui="{
        icon: { trailing: { pointer: '' } },
        rounded: 'rounded-lg',
        size: { xl: 'text-xl' },
        color: {
          white: {
            outline:
              'shadow-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-0 ring-inset ring-gray-300 dark:ring-gray-700 focus:shadow-card_bold focus:ring-0 dark:focus:ring-primary-400',
          },
        },
      }"
      placeholder="Pesquisar"
      size="xl"
    >
      <template #trailing>
        <div class="flex gap-4 h-full py-2">
          <UDivider orientation="vertical" />
          <UCheckbox
            :ui="{
              inner: 'ms-3 flex flex-col self-center',
              color: 'text-main dark:text-main',
              base: 'h-3 w-3 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
            }"
            class="self-center"
          >
            <template #label>
              <span class="text-xs text-main-300">Aplicar Filtros</span>
            </template></UCheckbox
          >
          <UDivider orientation="vertical" />
          <UButton
            color="gray"
            variant="link"
            icon="i-material-symbols-search-rounded"
            :padded="false"
            @click="console.log('teste')"
          />
        </div>
      </template>
    </UInput>
  </div>
</template>
