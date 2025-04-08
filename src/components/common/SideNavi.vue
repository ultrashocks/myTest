<template>
  <transition name="fade" mode="out-in">
    <aside
      class="side-navi"
      :key="firstLevelPath"
      :class="{ 'side-active': getSideActive }"
    >
      <div class="side-navi-wrap">
        <div class="side-navi-title">
          <span class="title">{{ naviTitle }}</span>
          <span class="btn-show" @click="onSideClick"></span>
        </div>
        <div class="side-navi-list">
          <ul>
            <li
              v-for="item in naviData"
              :key="item.name"
              class="side-navi-item"
            >
              <router-link :to="item.path" class="nav-link">
                {{ item.meta.title }}<i class="icon-arrow-right"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';

const naviTitle = ref('');
const naviData = ref([]);
const route = useRoute();

const firstLevelPath = computed(() => {
  const path = route.path;
  const parts = path.split('/');
  return parts.length > 1 ? `/${parts[1]}` : path;
});

const updateMenu = () => {
  const matched = route.matched;
  if (matched.length > 0) {
    const parentRoute = matched[0];
    naviTitle.value = parentRoute.meta.title;
    naviData.value = parentRoute.children.filter(
      child => child.meta.navi !== false,
    );
  }
};

updateMenu();

const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);
const { setSideActive } = uiStore;
const onSideClick = () => {
  setSideActive(!getSideActive.value);
};

watch(firstLevelPath, () => {
  updateMenu();
});
</script>
