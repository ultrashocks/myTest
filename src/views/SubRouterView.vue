<template>
  <section class="router-wrap">
    <div class="sub-router">
      <div class="wrap">
        <Header />
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <AppSlider />
  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import Header from '@/components/header/Header.vue';
const AppSlider = defineAsyncComponent(() =>
  import('@/components/ui/AppSlider.vue'),
);
</script>
