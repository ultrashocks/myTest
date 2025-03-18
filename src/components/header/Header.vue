<template>
  <header class="nav-wrap">
    <div class="nav-box">
      <h1 class="logo" @click="onMain">Targeting Advisor</h1>
      <Navigation :navis="naviData" />
      <div class="top-utils">
        <button class="btn-m cms">CMS 바로가기<i class="icon"></i></button>
        <div class="user-info">
          <i class="icon"></i>
          {{ logInfo }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { reactive } from 'vue';
import Navigation from '@/components/header/Navigation.vue';
import { getRoutes } from '@/router/index';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const generateNavis = () => {
  let menus = [];
  getRoutes.forEach(route => {
    if (route.meta && route.meta.navi) {
      const menu = {
        title: route.meta.title,
        path: route.path.replace(':id?', ''),
        lv2: [],
      };
      menus.push(menu);
    }
  });
  return menus;
};

const naviData = reactive(generateNavis());

const logInfo = ref('');
logInfo.value = '홍길동 책임  CVM/제휴플랫폼팀';

const onMain = () => {
  router.push('/');
};
</script>
