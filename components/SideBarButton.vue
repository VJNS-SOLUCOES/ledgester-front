<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  animation: {
    type: String,
    required: false,
  },
  style: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <UButton
    :ui="{
      rounded: 'rounded-full',
    }"
    :class="style"
    square
    size="sm"
    color="white"
    variant="solid"
  >
    <template #leading>
      <UIcon :name="icon" :class="'hover:' + animation" class="w-5 h-5 m-1 text-gray-500" />
    </template>
  </UButton>
</template>
