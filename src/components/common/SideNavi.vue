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
              v-for="item in normalMenuItems"
              :key="item.name"
              class="side-navi-item"
            >
              <!-- 일반 라우터 링크 -->
              <router-link
                v-if="!item.meta.isButton"
                :to="item.path"
                class="nav-link"
              >
                {{ item.meta.title }}<i class="icon-arrow-right"></i>
              </router-link>
            </li>
          </ul>
          <ul class="mt30 px16">
            <li
              v-for="item in buttonMenuItems"
              :key="item.name"
              class="side-navi-item"
            >
              <button
                v-if="item.meta.isButton"
                class="btn-lnb-link"
                @click="onCustomMenuClick(item)"
              >
                {{ item.meta.title }}<i class="icon-arrow-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';

const naviTitle = ref('');
const naviData = ref([]);
const route = useRoute();
const router = useRouter();

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

const onCustomMenuClick = item => {
  console.log('버튼 클릭됨:', item.name);
  router.push(item.path);
};

// 일반 메뉴만 추림
const normalMenuItems = computed(() =>
  naviData.value.filter(item => !item.meta?.isButton),
);

// 버튼 메뉴만 추림
const buttonMenuItems = computed(() =>
  naviData.value.filter(item => item.meta?.isButton),
);

watch(firstLevelPath, () => {
  updateMenu();
});
</script>
