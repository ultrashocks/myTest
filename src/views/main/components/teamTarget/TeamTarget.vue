<template>
  <div class="team-layout">
    <div class="layout-box team">
      <div class="main-title">
        <div class="title-l">
          <span class="title">타겟 건수</span>
          <span class="info">조회기간 : {{ searchDate }}</span>
        </div>
        <div class="title-r"></div>
      </div>
      <div class="team-target__count">
        <div
          class="count-box"
          :class="{ active: selectIndex === index }"
          v-for="(item, index) in countData"
          :key="index"
          @click="onSelect(index)"
        >
          <div class="label">{{ item.label }}</div>
          <div class="count">
            <NumberAnimation
              :from="0"
              :to="item.count"
              :duration="1"
              :format="formatNumber"
              easing="linear"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="team-target__table">
      <component
        :is="getAsyncComponents[`TeamTargetTable${selectIndex + 1}`]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NumberAnimation from 'vue-number-animation';
import { useDynamicComponents } from './composables/dynamicComponents';
// import TeamTargetTable1 from './TeamTargetTable1.vue';

const { getAsyncComponents } = useDynamicComponents();

const searchDate = ref('');
const countData = ref([]);
const attachData = () => {
  searchDate.value = '최근 30일 (25-05-31 ~ 25-06-29)';
  let testData = [];
  const labels = [
    '입력중',
    'AI 추천중',
    '작성완료',
    '대기중',
    '실행중',
    '실패',
    '중지(제그확인 건)',
    '중지',
  ];
  for (let i = 0; i < 8; i++) {
    testData.push({
      label: labels[i],
      count: Math.floor(Math.random() * 100),
    });
  }
  countData.value = testData;
};
attachData();

const selectIndex = ref(0);
const onSelect = index => {
  selectIndex.value = index;
};

const formatNumber = value => {
  return `${Number(value).toFixed(0)}`;
};
</script>
