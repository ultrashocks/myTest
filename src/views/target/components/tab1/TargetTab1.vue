<template>
  <div>
    <TargetTopInput></TargetTopInput>
    <div>
      <FilterBar></FilterBar>
    </div>
    <div>
      <GridComponent :headers="headers" :data="bodyData" :showCheckbox="true" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { toRefs } from 'vue';

import TargetTopInput from './TargetTopInput.vue';
import GridComponent from '@/views/CommonGrid.vue';
import FilterBar from './FilterBar.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

/* 헤더 key는 컬럼에 맞게 맞춰 주세요 */
const headers = ref([
  { label: '타겟 ID', key: 'target_id' },
  { label: '타겟 명', key: 'target_name' },
  { label: '타겟 그룹', key: 'target_group' },
  { label: 'CMS전송여부', key: 'cms_yn' },
  { label: '타겟 상태', key: 'target_status' },
  { label: '타겟 유형', key: 'target_type' },
  { label: '채널 상세', key: 'channel_detail' },
  { label: '일정 구분', key: 'schedule_type' },
  { label: '목표타겟 수', key: 'target_count' },
  { label: '회차', key: 'round' },
  { label: '세그추천', key: 'segment_recommendation' },
  { label: '세그관리', key: 'segment_management' },
  { label: '등록일', key: 'created_at' },
]);

const tableData = ref([
  {
    target_id: 'A0010005',
    target_name: '인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털',
    target_group: '업셀',
    cms_yn: '타겟저장종료',
    target_status: '실행대기',
    target_type: 'TV/요금제/상품변경/업셀',
    channel_detail: '디지털',
    channel_detail02: 'IB',
    schedule_type: '일정입력',
    target_count: '30,000',
    round: '1/1회',
    segment_recommendation: 'AI추천',
    segment_management: '수정',
    created_at: '2024-03-17',
  },
  {
    target_id: 'A0010004',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터',
    channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
]);

/*바꾸고 싶은 컬럼은 여기에 넣으세요.*/
const columnTransformations = {
  segment_management: (value, row) => {
    // 열 전체를 바꾸고싶으면 if 빼세요.
    if (row && row.segment_management != '-') {
      return {
        type: 'button',
        label: value,
        action: () => console.log(`${value} 설정`),
        align: 'center',
      };
    }
    return value;
  },

  schedule_type: (value, row) => {
    // 열 전체를 바꾸고싶으면 if 빼세요.
    if (row && row.target_id === 'A0010004') {
      return {
        type: 'link',
        label: value,
        url: `https://link.com?name=${value}`,
        align: 'right',
      };
    }
    return value;
  },

  cms_yn: (value, row) => {
    // 열 전체를 바꾸고싶으면 if 빼세요.
    if (row && row.cms_yn === 'CMS전송') {
      return {
        type: 'link',
        label: value,
        url: `https://link.com?name=${value}`,
        align: 'right',
      };
    }
    return value;
  },
};

const bodyData = computed(() => {
  return tableData.value.map(row => {
    let newRow = { ...row };
    Object.keys(columnTransformations).forEach(columnKey => {
      if (newRow[columnKey] !== undefined) {
        newRow[columnKey] = columnTransformations[columnKey](
          newRow[columnKey],
          row,
        );
      }
    });
    return newRow;
  });
});
</script>

<!-- 그리 컬럼 전체의 행을 바꾸고 싶다면 여기서 처리 -->
<style>
.table-container .table tbody tr td:nth-child(3) {
  text-align: left !important;
}

.table-container .table tbody tr td:nth-child(4) {
  text-align: center !important;
}

.table-container .table tbody tr td:nth-child(5) {
  text-align: center !important;
}
</style>
