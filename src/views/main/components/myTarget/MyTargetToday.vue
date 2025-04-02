<template>
  <div class="layout-box today">
    <div class="main-title">
      <div class="title-l">
        <span class="title"
          ><strong>TODAY</strong> AI타게팅 진행 중 현황 (<strong>{{
            count
          }}</strong
          >)</span
        >
        <span class="info">조회기간 : {{ searchDate }}</span>
      </div>
      <div class="title-r"></div>
    </div>
    <div class="box-contents"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchDate = ref('');
const count = ref(0);

const attachData = () => {
  searchDate.value = '25-05-31 ~ 25-06-29';
  count.value = 5;
};

attachData();
</script>
