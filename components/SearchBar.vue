<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'submitForm']);
const props = defineProps({
  defaultOpen: { type: Boolean, required: false, default: false },
  modelValue: { type: String, required: true },
});

const open = ref<boolean>(props.defaultOpen);
const overflowClass = ref(open.value ? 'overflow-visible' : 'overflow-hidden');
const contentRefs = ref<HTMLDivElement>();
const searchValue = ref<string>(props.modelValue);

const hadleInputClick = () => {
  emit('submitForm');
  if (searchValue.value.length >= 3 || searchValue.value === '')
    emit('update:modelValue', searchValue.value);
};

const contentHeight = () => {
  return contentRefs.value?.scrollHeight + 'px';
};

const handleOverflow = (value: boolean) => {
  if (!value) {
    overflowClass.value = 'overflow-hidden';
  } else {
    setTimeout(() => {
      overflowClass.value = 'overflow-visible';
    }, 300);
  }
};

watch(open, (newValue) => {
  handleOverflow(newValue);
});
</script>
<template>
  <div class="w-4/5 bg-white shadow-card rounded-xl">
    <UInput
      :ui="{
        icon: { trailing: { pointer: '' } },
        rounded: 'rounded-lg',
        size: { xl: 'text-2xl' },
        color: {
          white: {
            outline:
              'shadow-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-0 ring-inset ring-gray-300 dark:ring-gray-700 focus:shadow-none focus:ring-0 dark:focus:ring-primary-400',
          },
        },
      }"
      placeholder="Pesquisar"
      size="xl"
      v-model="searchValue"
    >
      <template #trailing>
        <div class="flex gap-3 h-full pr-2 py-2">
          <UDivider orientation="vertical" />
          <UCheckbox
            :ui="{
              inner: 'ms-3 flex flex-col self-center',
              color: 'text-main dark:text-main',
              base: 'h-3 w-3 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
            }"
            class="self-center"
            v-model="open"
          >
            <template #label>
              <span class="text-xs text-gray-500">Aplicar Filtros</span>
            </template>
          </UCheckbox>
          <UDivider orientation="vertical" />
          <UButton
            color="gray"
            variant="link"
            icon="i-material-symbols-search-rounded"
            :padded="false"
            type="button"
            @click="hadleInputClick()"
          />
        </div>
      </template>
    </UInput>
    <div
      class="accordion-content flex flex-col items-center transition-all duration-300"
      :class="overflowClass"
      :style="{ maxHeight: open ? contentHeight() : '0px' }"
      ref="contentRefs"
    >
      <div class="flex w-full px-3">
        <UDivider class="" />
      </div>
      <div class="py-[10px] w-full bg-white rounded-xl">
        <slot />
      </div>
    </div>
  </div>
</template>
