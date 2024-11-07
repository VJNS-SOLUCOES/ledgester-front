<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
colorMode.preference = "light";
</script>
