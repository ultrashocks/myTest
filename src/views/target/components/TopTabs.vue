<template>
  <div class="top-tabs">
    <div
      class="top-tab"
      :class="{
        active: currentTab === index + 1,
      }"
      v-for="(tab, index) in tabs"
      :key="tab.label"
      @click="onTabClick(index + 1)"
    >
      <div class="item">
        <div class="label" v-html="tab.label"></div>
      </div>
    </div>
    <div class="btn">
      <button class="btn-target"></button>
    </div>
    <button class="btn-m target tab-right-btn">
      <div>신규 타겟팅</div>
      <i class="icon"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update:currentTab']);

// const listCnt1 = ref(30);
// const listCnt2 = ref(20);
// const listCnt3 = ref(50);
// const listCnt4 = ref(60);
//
// const tabs = ref([
//   { label: `나의 타겟 (<span class="count">${listCnt1.value}</span>)` },
//   { label: `우리팀 타겟 (<span class="count">${listCnt2.value}</span>)` },
//   { label: `공유 받은 타겟 (<span class="count">${listCnt3.value}</span>)` },
//   { label: `모든 타겟 (<span class="count">${listCnt4.value}</span>)` },
// ]);

const tabs = ref([
  { label: `나의 타겟` },
  { label: `우리팀 타겟` },
  { label: `공유 받은 타겟` },
  { label: `모든 타겟` },
]);

const currentTab = ref(1);

const onTabClick = index => {
  currentTab.value = index;
  emit('update:currentTab', index);
};
</script>

<style scoped></style>
