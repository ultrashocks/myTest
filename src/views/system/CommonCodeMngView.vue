<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view">
          <CommonCodeSearch @search="onSearch" />
          <div class="table-controls">
            <div class="table-controls__left">
              <div class="sub-title">공통코드 그룹 목록</div>
              <div class="table-total">
                전체 <strong>{{ total }}</strong>
              </div>
            </div>
            <div class="table-controls__right">
              <button class="btn-common add" @click="onAddCommonCode">
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
                  <col width="10%" />
                  <col width="20%" />
                  <col width="" />
                  <col width="70" />
                  <col width="14%" />
                  <col width="14%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>공통코드 그룹 ID</th>
                    <th>공통코드 그룹명</th>
                    <th>설명</th>
                    <th>사용 여부</th>
                    <th>변경일시</th>
                    <th>변경자</th>
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
                  <col width="10%" />
                  <col width="20%" />
                  <col width="" />
                  <col width="70" />
                  <col width="14%" />
                  <col width="14%" />
                </colgroup>
                <tbody>
                  <tr
                    v-for="(item, rowIndex) in tableData"
                    :key="item.id"
                    :class="{
                      checked: selectRowId === item.id,
                      add: rowIndex === 0 && currentState === 'add',
                    }"
                    @mouseover="checkEllipsis($event, rowIndex)"
                    @click="onSelectRow(item.id)"
                  >
                    <td :title="isEll[rowIndex] ? item.groupId : ''">
                      {{ item.groupId }}
                    </td>
                    <td
                      :title="isEll[rowIndex] ? item.groupName : ''"
                      class="td-left"
                    >
                      {{ item.groupName }}
                    </td>
                    <td
                      :title="isEll[rowIndex] ? item.explain : ''"
                      class="td-left"
                    >
                      {{ item.explain }}
                    </td>
                    <td>
                      {{ item.useYn }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.createdAt : ''">
                      {{ item.createdAt }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.modifier : ''">
                      {{ item.modifier }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 조회 결과가 없는경우에 보이게 처리 -->
              <div class="non-table__data" v-if="tableData.length < 1">
                <div class="msg-box">
                  <i class="icon"></i>
                  <div class="msg">조회 정보가 없습니다.</div>
                </div>
              </div>
            </div>
          </div>
          <CommonCodeDetail
            :selectRowId="selectRowId"
            :currentState="currentState"
            v-if="currentState !== ''"
            @cancel="onCancel"
            @save="onSave"
          />
        </div>
      </section>
    </div>
    <!-- Confrim창 -->
    <!-- <AppDialog
      v-model:view="deleteConfirmState.view"
      :title="deleteConfirmState.title"
      :message="deleteConfirmState.message"
      @confirm="onConfrim"
    /> -->
  </div>
</template>

<script setup>
import AppDialog from '@/components/ui/AppDialog.vue';
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
import { onMounted, ref, nextTick, reactive } from 'vue';
import { useScrollChecker } from '@/composables/useScrollChecker';
import { useEllipsisChecker } from '@/composables/useEllipsisChecker';
import { useAlert } from '@/composables/alert';
import { randomKey } from '@/utils/utils';
import CommonCodeSearch from './components/commonCode/CommonCodeSearch.vue';
import CommonCodeDetail from './components/commonCode/CommonCodeDetail.vue';
import { useSlider } from '@/composables/slider';

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
  for (let i = 0; i < 50; i++) {
    tableData.value.push({
      id: randomKey(),
      groupId: `G001000${i}`,
      groupName: '공통코드명',
      explain: '타겟유형 조합 중 서비스 구분',
      useYn: Math.random() < 0.5 ? 'Y' : 'N',
      createdAt: '2025-04-13 10:00:00',
      modifier: '등록자 or 변경자',
    });
  }
  total.value = tableData.value.length;
  await nextTick();
  checkScroll();
};

const onSearch = searchData => {
  console.log(searchData);
};

const currentState = ref('');
const selectRowId = ref('');
const onAddCommonCode = () => {
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
    groupId: '',
    groupName: '',
    explain: '',
    useYn: '',
    createdAt: '',
    modifier: '',
  });
  moveToScrollBottom();
};

// const onDeleteProgram = () => {
//   if (currentState.value !== '') {
//     setAlertStatus({
//       view: true,
//       message: '입력 중인 내용이 있습니다.<br>저장을 먼저 해 주세요.',
//     });
//     return;
//   }
//   if (tableData.value.some(file => file.checked)) {
//     deleteConfirmState.view = true;
//   } else {
//     setAlertStatus({
//       view: true,
//       message: '삭제할 항목을 한개 이상 체크해주세요.',
//     });
//   }
// };

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
    tableData.value[0] = rowData;
    currentState.value = '';
  } else {
    //수정
    // selectRowId.value = '';
  }

  setSliderStatus({
    view: true,
    message: '저장되었습니다.',
  });
};

// Confrim창
/* const deleteConfirmState = reactive({
  view: false,
  message: `프로그램을 삭제하시겠습니까?`,
});
const onConfrim = () => {
  // if (currentState.value === 'add' && tableData.value[0]?.checked) {
  //   currentState.value = '';
  // }
  currentState.value = '';
  tableData.value = tableData.value.filter(file => !file.checked);
  setSliderStatus({
    view: true,
    message: '프로그램이 삭제되었습니다.',
  });
};
 */
onMounted(() => {
  attachData();
});
</script>
