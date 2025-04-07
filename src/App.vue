<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <Alert />
  <AppSpinner />
</template>

<script setup="setup">
import { defineAsyncComponent } from 'vue';
const Alert = defineAsyncComponent(() =>
  import('@/components/ui/AppAlert.vue'),
);
const AppSpinner = defineAsyncComponent(() =>
  import('@/components/ui/AppSpinner.vue'),
);
</script>

<style lang="scss"></style>
