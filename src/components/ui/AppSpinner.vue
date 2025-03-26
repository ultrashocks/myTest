<template>
  <transition name="fade-loading" mode="out-in">
    <div class="pop-preloading" v-if="spinnerStatus" ref="preloading">
      <span class="preloader"></span>
      <div class="preloader-text">AI 정보 조회중입니다.</div>
    </div>
  </transition>
</template>

<script setup>
import { useSpinner } from '@/composables/spinner';
const { spinnerStatus } = useSpinner();
</script>
