<template>
  <div style="height: 100%">
    <TargetTopInput></TargetTopInput>

    <FilterBar></FilterBar>

    <TableComponent
      :headers="headers"
      :data="bodyData"
      :pagingData="pagingData"
      :showCheckbox="true"
    />

    <ul class="footer-button-box">
      <li>
        <button>삭제</button>
      </li>
      <li class="footer-button-last-box">
        <button>실행재개</button>
        <button>중지</button>
        <button>실행종료</button>
        <button @click="onShareModal">공유</button>
        <button>복사</button>
      </li>
    </ul>
    <!-- 제한조건 추가 모달 -->
    <AppWindow v-model:view="toggleShareModal" width="900px" height="640px">
      <TargetSharingModal
        @callBeck="callModalData"
        @cancel="toggleShareModal = false"
      />
    </AppWindow>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import TargetTopInput from './TargetTopInput.vue';
import TableComponent from '@/views/CommonTable.vue';
import FilterBar from './FilterBar.vue';
import router from '@/router/index.js';
import AppWindow from '@/components/ui/AppWindow.vue';
import TargetSharingModal from '@/views/targeting/components/step4/components/modals/TargetSharingModal.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

/* 헤더 key는 컬럼에 맞게 맞춰 주세요. 이부분은 직접 입력 하셔야합니다!*/
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
    target_id: 'A0010001',
    target_name: '인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털',
    target_group: '업셀',
    cms_yn: '타겟저장종료',
    target_status: '실행대기',
    target_type: 'TV/요금제/상품변경/업셀',
    channel_detail: '디지털/IB',
    //channel_detail02: 'IB',
    schedule_type: '일정입력',
    target_count: '30,0000000000000000000000',
    round: '1/1회',
    segment_recommendation: 'AI추천',
    segment_management: '수정',
    created_at: '2024-03-17',
  },
  {
    target_id: 'A0010002',
    target_name:
      '스마트홈_신규_구글패키지_가입 인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010003',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '일이삼사오륙칠팔구십일이삼사오륙칠팔구십',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '모바일+홈/매뉴얼 관리/관계형성/월정액 업셀',
    channel_detail: '디지털/앱푸시',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '9,999/9,999회',
    segment_recommendation: 'AI추천',
    segment_management: '',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010004',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '인터넷/요금제/상품변경/기가업셀',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010005',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010006',
    target_name:
      '인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010007',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010008',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010009',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010010',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010011',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010012',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010013',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010014',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '',
    created_at: '2024-03-16',
  },
  {
    target_id: 'A0010015',
    target_name: '스마트홈_신규_구글패키지_가입',
    target_group: '신규유치',
    cms_yn: 'CMS전송',
    target_status: '중지',
    target_type: '스마트홈/요금제/신규가입',
    channel_detail: '고객센터/IB',
    //channel_detail02: 'IB',
    schedule_type: '한번',
    target_count: '50,000',
    round: '6/365회',
    segment_recommendation: 'AI추천',
    segment_management: '세그확인',
    created_at: '2024-03-16',
  },
]);

// 조회해서 데이터 가지고왔을때 필요한값
// 총 로우수, 현재 클릭한 페이지 번호, 한 페이지에 몇개의 로우를 보여줄지
const pagingData = {
  max: '100',
  current: '2',
  perPage: '10',
};

/*바꾸고 싶은 컬럼은 여기에 넣으세요.*/
const columnTransformations = {
  //타겟명
  target_name: (value, row) => {
    return {
      type: 'text',
      label: value,
      align: 'left',
    };
  },

  segment_management: (value, row) => {
    // 열 전체를 바꾸고싶으면 if 빼세요.
    if (row && row.segment_management !== '') {
      return {
        type: 'button',
        label: value,
        action: () =>
          router.push({ name: 'business', params: { id: row.target_id } }),
        align: 'center',
      };
    }
    return '-';
  },

  target_group: (value, row) => {
    // 열 전체를 바꾸고싶으면 if 빼세요.
    return {
      type: 'text',
      label: value,
      // action: () => modal(),
      align: 'left',
    };
  },

  schedule_type: (value, row) => {
    // 열 전체를 바꾸고싶으면 if 빼세요.
    if (row && row.schedule_type === '일정입력') {
      return {
        type: 'button',
        label: value,
        // action: () => modal(),
        align: 'center',
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
        // align: 'right',
      };
    }
    return value;
  },

  round: (value, row) => {
    return {
      type: 'link',
      label: value,
      url: `https://link.com?name=${value}`,
      // align: 'right',
    };
  },

  target_count: (value, row) => {
    return {
      type: 'text',
      label: value,
      align: 'right',
    };
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

// 푸터 공유 버튼 모달 및 이벤트
const toggleShareModal = ref(false);
const onShareModal = idx => {
  toggleShareModal.value = true;
};

// 모달에서 데이터 내려받을때
const callModalData = (data, groupIndex) => {}
</script>
