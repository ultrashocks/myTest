<template>
  <div class="team-layout">
    <div class="layout-box team">
      <div class="main-title">
        <div class="title-l">
          <span class="title">타겟 건수</span>
          <span class="info">조회기간 : {{ searchDate }}</span>
        </div>
        <div class="title-r">
          <div class="search-row">
            <div class="row-select">
              <label>타겟 유형</label>
              <AppSelectBox
                :options="targetOptions"
                v-model:optionsSelected="targetSelected"
                style="width: 230px"
              />
            </div>
            <div class="row-select">
              <label>담당자</label>
              <AppSelectBox
                :options="managerOptions"
                v-model:optionsSelected="managerSelected"
                style="width: 150px"
              />
            </div>
            <button class="btn-search"><i class="icon"></i>조회</button>
          </div>
        </div>
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
      <component :is="currentTableComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import NumberAnimation from 'vue-number-animation';
import TeamTargetTable1 from './TeamTargetTable1.vue';
import TeamTargetTable2 from './TeamTargetTable2.vue';
import TeamTargetTable3 from './TeamTargetTable3.vue';
import TeamTargetTable4 from './TeamTargetTable4.vue';
import TeamTargetTable5 from './TeamTargetTable5.vue';
import TeamTargetTable6 from './TeamTargetTable6.vue';
import TeamTargetTable7 from './TeamTargetTable7.vue';
import TeamTargetTable8 from './TeamTargetTable8.vue';
import { reactive } from 'vue';

const tableComponents = [
  TeamTargetTable1,
  TeamTargetTable2,
  TeamTargetTable3,
  TeamTargetTable4,
  TeamTargetTable5,
  TeamTargetTable6,
  TeamTargetTable7,
  TeamTargetTable8,
];
const currentTableComponent = computed(
  () => tableComponents[selectIndex.value],
);

/*
 * 검색
 */
// 타겟유형
const targetOptions = reactive([
  { label: '전체', value: 0 },
  { label: '타겟유형1', value: 1 },
  { label: '타겟유형2', value: 2 },
]);
const targetSelected = ref({ label: '전체', value: 0 });
// 담당자
const managerOptions = reactive([
  { label: '전체', value: 0 },
  { label: '담당자1', value: 1 },
  { label: '담당자2', value: 2 },
]);
const managerSelected = ref({ label: '전체', value: 0 });

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
    '중지(세그확인 건)',
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
