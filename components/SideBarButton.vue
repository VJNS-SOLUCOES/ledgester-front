<script setup lang="ts">
import type { PropType } from 'vue';

type Size = 'md' | 'sm' | 'lg' | 'xs' | 'xl' | '2xs';

defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String as PropType<Size>,
    required: true,
  },
  animate: {
    type: String,
    required: false,
  },
  buttonStyle: {
    type: Object,
    required: false,
  },
  iconStyle: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['handleClick']);
</script>

<template>
  <UButton
    :ui="{
      rounded: 'rounded-full',
    }"
    :class="buttonStyle"
    square
    :size="size"
    color="white"
    variant="solid"
    @click="emit('handleClick')"
  >
    <template #leading>
      <UIcon :name="icon" :class="animate" class="w-5 h-5 m-1 text-gray-500" />
    </template>
  </UButton>
</template>
