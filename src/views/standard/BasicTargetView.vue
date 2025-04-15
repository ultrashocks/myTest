<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view">
          <BasicTargetSearch @search="onSearch" />
          <div class="table-controls">
            <div class="table-controls__left">
              <div class="sub-title">타겟유형 목록</div>
              <div class="table-total">
                전체 <strong>{{ total }}</strong>
              </div>
            </div>
            <div class="table-controls__right">
              <button class="btn-common add" @click="onAddMenu">
                추가<i></i>
              </button>
            </div>
          </div>
          <div class="table-common">
            <div
              class="table-common__header"
              :class="{ 'has-scroll': hasVerticalScroll }"
            >
              <table>
                <colgroup>
                  <col width="70" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="" />
                  <col width="80" />
                  <col width="15%" />
                  <col width="12%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>자사/타사 구분</th>
                    <th>서비스</th>
                    <th>상품유형</th>
                    <th>업무구분</th>
                    <th>업무상세</th>
                    <th>사용여부</th>
                    <th>작성일</th>
                    <th>작성자</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div
              class="table-common__body"
              style="height: 360px"
              ref="scrollContainer"
            >
              <table>
                <colgroup>
                  <col width="70" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="" />
                  <col width="80" />
                  <col width="15%" />
                  <col width="12%" />
                </colgroup>
                <tbody>
                  <tr
                    v-for="(item, rowIndex) in tableData"
                    :key="item.id"
                    :class="{
                      checked: item.checked || selectRowId === item.id,
                      add: rowIndex === 0 && currentState === 'add',
                    }"
                    @mouseover="checkEllipsis($event, rowIndex)"
                    @click="onSelectRow(item.id)"
                  >
                    <td>
                      {{ item.no }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.screenType : ''">
                      {{ formatScreenType(item.screenType) }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.service : ''">
                      {{ item.service }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.productType : ''">
                      {{ item.productType }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.businessType : ''">
                      {{ item.businessType }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.businessDetail : ''">
                      {{ item.businessDetail }}
                    </td>
                    <td>
                      {{ item.useYn }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.createDate : ''">
                      {{ item.createDate }}
                    </td>
                    <td>
                      {{ item.writer }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 조회 결과가 없는경우에 보이게 처리 -->
              <div class="non-table__data" v-if="tableData.length < 1">
                <div class="msg-box">
                  <i class="icon"></i>
                  <div class="msg">데이터가 없습니다.</div>
                </div>
              </div>
            </div>
          </div>
          <BasicTargetDetail
            :selectRowId="selectRowId"
            :currentState="currentState"
            v-if="currentState !== ''"
            @cancel="onCancel"
            @save="onSave"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
import { onMounted, ref, nextTick, reactive } from 'vue';
import { useScrollChecker } from '@/composables/useScrollChecker';
import { useEllipsisChecker } from '@/composables/useEllipsisChecker';
import { useAlert } from '@/composables/alert';
import { randomKey } from '@/utils/utils';
import { useSlider } from '@/composables/slider';
import BasicTargetSearch from './components/basicTarget/BasicTargetSearch.vue';
import BasicTargetDetail from './components/basicTarget/BasicTargetDetail.vue';
import { computed } from 'vue';

const { setAlertStatus } = useAlert();
const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);
const { setSliderStatus } = useSlider();

// 스크롤 유무 체크
const scrollContainer = ref(null);
const { hasVerticalScroll, checkScroll } = useScrollChecker(scrollContainer);

// // 툴팁 유무 체크
const { isEll, checkEllipsis } = useEllipsisChecker();

const tableData = ref([]);
const total = ref(0);
const attachData = async () => {
  const sampleData = [];
  for (let i = 0; i < 50; i++) {
    sampleData.push({
      id: randomKey(),
      no: i + 1,
      screenType: ['자사', '타사'],
      service: '서비스',
      productType: '상품유형',
      businessType: '업무구분',
      businessDetail: '업무상세',
      useYn: Math.random() < 0.5 ? 'Y' : 'N',
      createDate: '2025-04-12 12:00:00',
      writer: '작성자',
    });
  }
  tableData.value = sampleData.reverse();
  total.value = tableData.value.length;
  await nextTick();
  checkScroll();
};

const onSearch = searchData => {
  console.log(searchData);
};

const currentState = ref('');
const selectRowId = ref('');
const onAddMenu = () => {
  if (currentState.value !== '') {
    setAlertStatus({
      view: true,
      message: '입력 중인 내용이 있습니다.<br>저장을 먼저 해 주세요.',
    });
    return;
  }
  currentState.value = 'add';
  selectRowId.value = '';
  tableData.value.unshift({
    id: randomKey(),
    checked: false,
    menuId: '',
    menuName: '',
    menuLevel: {},
    menuOrder: '',
    menuModuleName: '',
    topMenuId: '',
    auth: [],
    useYn: '',
  });
  moveToScrollBottom();
};

const onSelectRow = id => {
  if (currentState.value === 'add') return;
  selectRowId.value = id;
  currentState.value = 'edit';
  moveToScrollBottom();
};

const moveToScrollBottom = () => {
  if (currentState.value !== '') {
    const contentArea = document.querySelector('.contents-layout');
    if (contentArea) {
      setTimeout(() => {
        contentArea.scrollTo({
          top: contentArea.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
    scrollContainer.value.scrollTo({
      top: 0,
    });
  }
};

const onCancel = () => {
  if (currentState.value === 'add') {
    tableData.value.shift();
  }
  currentState.value = '';
  selectRowId.value = '';
};

const onSave = rowData => {
  if (currentState.value === 'add') {
    //추가
    rowData.no = tableData.value.length;
    rowData.service = rowData.service.value;
    rowData.productType = rowData.productType.value;
    rowData.businessType = rowData.businessType.value;
    rowData.businessDetail = rowData.businessDetail.value;
    rowData.createDate = '2025-04-12 12:00:00';
    rowData.writer = '작성자';
    tableData.value[0] = rowData;
  } else {
    //수정
    selectRowId.value = '';
  }
  currentState.value = '';
  setSliderStatus({
    view: true,
    message: '저장되었습니다.',
  });
};

const formatScreenType = screenType => {
  return Array.isArray(screenType) ? screenType.join(' | ') : screenType;
};

onMounted(() => {
  attachData();
});
</script>
