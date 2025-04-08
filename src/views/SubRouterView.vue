<template>
  <section class="router-wrap">
    <div class="sub-router">
      <div class="wrap">
        <Header />
        <transition name="side-fade" mode="out-in">
          <SideNavi v-if="showSideNavi" />
        </transition>
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
import { defineAsyncComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/header/Header.vue';
const AppSlider = defineAsyncComponent(() =>
  import('@/components/ui/AppSlider.vue'),
);

const route = useRoute();
const showSideNavi = computed(() => {
  const path = route.path;
  return (
    path.includes('/business') ||
    path.includes('/standard') ||
    path.includes('/system')
  );
});
</script>
