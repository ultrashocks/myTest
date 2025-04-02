<template>
  <div class="layout-box error">
    <div class="main-title">
      <div class="title-l">
        <span class="title"
          >6월 오류발생 타겟 건 (<strong>{{ count }}</strong
          >)</span
        >
      </div>
      <div class="title-r"></div>
    </div>
    <div class="box-contents"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);
const attachData = () => {
  count.value = 10;
};

attachData();
</script>
