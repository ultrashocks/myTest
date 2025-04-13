<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view">
          <ProgreamSearch @search="onSearch" />
          <div class="table-controls">
            <div class="table-controls__left">
              <div class="sub-title">프로그램 목록</div>
              <div class="table-total">
                전체 <strong>{{ total }}</strong>
              </div>
            </div>
            <div class="table-controls__right">
              <button class="btn-common add" @click="onAddProgram">
                추가<i></i></button
              ><button
                class="btn-common del"
                @click="onDeleteProgram"
                :disabled="!hasCheckedItems"
              >
                삭제<i></i>
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
                  <col width="45" />
                  <col width="10%" />
                  <col width="" />
                  <col width="8%" />
                  <col width="20%" />
                  <col width="15%" />
                  <col width="8%" />
                  <col width="70" />
                </colgroup>
                <thead>
                  <tr>
                    <th>선택</th>
                    <th>프로그램 ID</th>
                    <th>프로그램명</th>
                    <th>메뉴 모듈명</th>
                    <th>액션 URL</th>
                    <th>권한</th>
                    <th>화면유형</th>
                    <th>사용 유무</th>
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
                  <col width="45" />
                  <col width="10%" />
                  <col width="" />
                  <col width="8%" />
                  <col width="20%" />
                  <col width="15%" />
                  <col width="8%" />
                  <col width="70" />
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
                      <div class="custom-checkbox">
                        <label @click.stop>
                          <input type="checkbox" v-model="item.checked" />
                          <i class="icon"></i>
                        </label>
                      </div>
                    </td>
                    <td :title="isEll[rowIndex] ? item.prgId : ''">
                      {{ item.prgId }}
                    </td>
                    <td
                      :title="isEll[rowIndex] ? item.prgName : ''"
                      class="td-left"
                    >
                      {{ item.prgName }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.menuModelName : ''">
                      {{ item.menuModelName }}
                    </td>
                    <td
                      :title="isEll[rowIndex] ? item.actionUrl : ''"
                      class="td-left"
                    >
                      {{ item.actionUrl }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.auth : ''">
                      {{ item.auth.join(', ') }}
                    </td>
                    <td :title="isEll[rowIndex] ? item.screenType : ''">
                      {{ item.screenType }}
                    </td>
                    <td>
                      {{ item.useYn }}
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
          <ProgramDetail
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
    <AppDialog
      v-model:view="deleteConfirmState.view"
      :title="deleteConfirmState.title"
      :message="deleteConfirmState.message"
      @confirm="onConfrim"
    />
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
import ProgreamSearch from './components/program/ProgreamSearch.vue';
import ProgramDetail from './components/program/ProgramDetail.vue';
import { useSlider } from '@/composables/slider';
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
  for (let i = 0; i < 50; i++) {
    tableData.value.push({
      id: randomKey(),
      checked: false,
      prgId: `M001000${i}`,
      prgName:
        '인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)_디지털',
      menuModelName: '모델명',
      actionUrl: '/web/target/components/tab4/TargetTab4.vue',
      auth: ['일반(마케터)', '팀장', '일반'],
      screenType: '레이어 팝업',
      useYn: Math.random() < 0.5 ? 'Y' : 'N',
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
const onAddProgram = () => {
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
    prgId: '',
    prgName: '',
    menuModelName: '',
    actionUrl: '',
    auth: [],
    screenType: '',
    useYn: '',
  });
  moveToScrollBottom();
};

const onDeleteProgram = () => {
  if (currentState.value !== '') {
    setAlertStatus({
      view: true,
      message: '입력 중인 내용이 있습니다.<br>저장을 먼저 해 주세요.',
    });
    return;
  }
  if (tableData.value.some(file => file.checked)) {
    deleteConfirmState.view = true;
  }
  //  else {
  //   setAlertStatus({
  //     view: true,
  //     message: '삭제할 항목을 한개 이상 체크해주세요.',
  //   });
  // }
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

// Confrim창
const deleteConfirmState = reactive({
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

const hasCheckedItems = computed(() => {
  return tableData.value.some(item => item.checked);
});

onMounted(() => {
  attachData();
});
</script>
