<template>
  <div class="contents-wrap">
    <div class="contents-layout">
      <section class="contents-section">
        {{ getSideActive }}
        <MainTitle />
        <Location />
      </section>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);
</script>
