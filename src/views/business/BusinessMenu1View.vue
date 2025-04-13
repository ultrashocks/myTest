<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view">
          <div style="height: 100%">
            <TargetTopInput></TargetTopInput>

            <div class="filter-container">
              <div class="d-flex align-center">
                <div class="inner-item">
                  <div>전체 <span class="font-primary">19</span></div>
                </div>
              </div>
            </div>

            <TableComponent
              :data="bodyData"
              :pagingData="pagingData"
              :showCheckbox="true"
            />
            <TablePaging
              :max="249"
              :current="currentPage"
              :perPage="15"
              @update:current="updateCurrentPage"
            />
            <ul class="footer-button-box">
              <li></li>
              <li class="footer-button-last-box">
                <button>글쓰기</button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);

import { ref, computed, watch } from 'vue';

import TargetTopInput from '@/views/business/components/BusinessMenu1/TargetTopInput.vue';
import TableComponent from '@/views/business/components/BusinessMenu1/TableComponent.vue';
import TablePaging from '@/views/TablePaging.vue';

const bodyData = ref([
  {
    boardId: 'A0010001',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: true,
    fileYn: true,
    importantYn: true,
    securityYn: false,
  },
  {
    target_id: 'A0010002',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: true,
    fileYn: true,
    importantYn: true,
    securityYn: false,
  },
  {
    target_id: 'A0010003',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: true,
    fileYn: true,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010004',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: false,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010005',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: false,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010006',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: true,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010007',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: false,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010008',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: false,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010009',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: true,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010010',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: false,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010011',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: true,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010012',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: true,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010013',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: false,
    importantYn: false,
    securityYn: false,
  },
  {
    target_id: 'A0010014',
    boardName: 'AI 추천 서비스 개선 안내',
    boardInputDate: '2025-05-10',
    newYn: false,
    fileYn: false,
    importantYn: false,
    securityYn: false,
  },
]);

// 조회해서 데이터 가지고왔을때 필요한값
// 총 로우수, 현재 클릭한 페이지 번호, 한 페이지에 몇개의 로우를 보여줄지
const pagingData = {
  max: '100',
  current: '2',
  perPage: '10',
};

// 푸터 공유 버튼 모달 및 이벤트
const toggleShareModal = ref(false);
const onShareModal = idx => {
  toggleShareModal.value = true;
};

// 페이징
let currentPage = ref(1);
const updateCurrentPage = page => {
  currentPage.value = page;
};

watch(
  () => currentPage.value,
  (newPage, oldPage) => {
    console.log(`currentPage 변경됨: ${oldPage} -> ${newPage}`);
    /*페이지변경 감지 될떄 다시한번 목록 조회 api호출 하면 됩니다!!*/
  },
  { immediate: true },
);
</script>
