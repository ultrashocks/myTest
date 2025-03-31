<template>
  <div class="window-contents">
    <div class="window-header">
      제외조건 추가
      <button
        class="btn-info"
        v-tippy="{
          content: '도움말 도움말',
          placement: 'right-start',
          allowHTML: true,
          maxWidth: 500,
        }"
      >
        <span>도움말</span>
      </button>
    </div>
    <div class="window-body">
      <div class="search-table">
        <div class="tabs-row">
          <div class="top-tabs">
            <div
              class="top-tab"
              :class="{ active: selectTab === item.id }"
              @click="onSelectTab(item.id)"
              v-for="item in tabData"
              :key="item.id"
            >
              <div class="item">
                <div class="label">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 목록에서 선택 탭 -->
        <div v-if="selectTab === 1">
          <div class="search-row">
            <div class="search-box">
              <div class="search-col">
                <label>구분</label>
                <AppSelectBox
                  :options="typeOptions"
                  v-model:optionsSelected="searchData.typeSelected"
                  style="width: 114px"
                />
              </div>
              <div class="search-col">
                <label>조건 그룹</label>
                <AppSelectBox
                  :options="groupOptions"
                  v-model:optionsSelected="searchData.groupSelected"
                  style="width: 114px"
                />
              </div>
              <div class="search-col">
                <label>조건명</label>
                <AppInput
                  style="width: 315px"
                  v-model="searchData.title"
                  placeholder="조건명 입력"
                />
              </div>
              <button class="btn-search"><i class="icon"></i>조회</button>
            </div>
          </div>
          <div class="table-row use-tab">
            <div class="table-scroll">
              <div class="table-header">
                <table>
                  <colgroup>
                    <col width="4%" />
                    <col width="10%" />
                    <col width="16%" />
                    <col width="" />
                    <col width="10%" />
                    <col width="25%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>
                        <!--                        <div class="td-col radio">-->
                        <!--                          <div-->
                        <!--                            class="custom-checkbox"-->
                        <!--                            style="margin-left: 14.5px"-->
                        <!--                          >-->
                        <!--                            <label>-->
                        <!--                              <input-->
                        <!--                                type="checkbox"-->
                        <!--                                v-model="selectAll"-->
                        <!--                                @change="toggleSelectAll"-->
                        <!--                              />-->
                        <!--                              <i class="icon"></i>-->
                        <!--                            </label>-->
                        <!--                          </div>-->
                        <!--                        </div>-->
                      </th>
                      <th>구분</th>
                      <th>상품코드</th>
                      <th>상품명</th>
                      <th>기본료</th>
                      <th>그룹명</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table-body">
                <table>
                  <colgroup>
                    <col width="4%" />
                    <col width="10%" />
                    <col width="16%" />
                    <col width="" />
                    <col width="10%" />
                    <col width="25%" />
                  </colgroup>
                  <tbody>
                    <tr
                      v-for="(item, rowIndex) in tableData"
                      :key="item.id"
                      :class="{ active: selectedRows.includes(item.id) }"
                      @mouseover="checkEllipsis($event, rowIndex)"
                      class="type2"
                    >
                      <td>
                        <div class="td-col radio">
                          <div class="custom-checkbox">
                            <label>
                              <input
                                type="checkbox"
                                v-model="selectedRows"
                                @click="onSelectRow(item)"
                                :value="item.id"
                                @change="updateSelectAll"
                              />
                              <i class="icon"></i>
                            </label>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          class="td-col"
                          :title="isEll[rowIndex] ? item.type : ''"
                        >
                          {{ item.type }}
                        </div>
                      </td>
                      <td>
                        <div
                          class="td-col"
                          :title="isEll[rowIndex] ? item.prdCode : ''"
                        >
                          {{ item.prdCode }}
                        </div>
                      </td>
                      <td class="td-left">
                        <div
                          class="td-col"
                          :title="isEll[rowIndex] ? item.prdName : ''"
                        >
                          {{ item.prdName }}
                        </div>
                      </td>
                      <td class="td-right">
                        <div
                          class="td-col"
                          :title="isEll[rowIndex] ? item.price : ''"
                        >
                          {{ item.price }}
                        </div>
                      </td>
                      <td class="td-left">
                        <div
                          class="td-col"
                          :title="isEll[rowIndex] ? item.group : ''"
                        >
                          {{ item.group }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 조회 결과가 없는경우에 보이게 처리 -->
                <!-- <div class="non-table__data">
                <div class="msg-box">
                  <i class="icon"></i>
                  <div class="msg">조회 결과가 없습니다.</div>
                </div>
              </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- SQL 선택 탭 -->
        <div v-else class="">
          <div class="add-row">
            <div class="add-box">
              <div class="d-flex align-center mb8">
                <span class="font-size-18 font-weight-600 font-secondary">조건명 기재</span>
                <button
                  class="btn-info"
                  v-tippy="{
                    content: '도움말 도움말',
                    placement: 'right-start',
                    allowHTML: true,
                    maxWidth: 500,
                  }"
                >
                  <span>도움말</span>
                </button>
              </div>
              <div
                class="d-flex align-center justify-between gap-8px position relative mb74"
              >
                <AppInput
                  style="width: 100%"
                  v-model="searchData.title"
                  placeholder="최대 50자, (예시) 넷플릭스에서 ‘흑백요리사’ 검색 고객"
                />
                <button class="btn-search w-53px" @click="addCondName">입력</button>

                <div
                  class="position absolute"
                  style="transform: translate(0%, 150%)"
                >
                  <span v-if="condNameChk" class="font-success font-size-12">사용할 수 있는 조건명 입니다.</span>
                  <span v-else class="">사용할 수 없는 조건명 입니다.</span>
                </div>
              </div>
              <div class="sqlAddWrap">
                <div class="d-flex align-center justify-between">
                  <div class="d-flex align-center mb8">
                    <span class="font-size-18 font-weight-600 text-nowrap font-secondary">SQL 입력</span>
                    <button
                      class="btn-info"
                      v-tippy="{
                        content: '도움말 도움말',
                        placement: 'right-start',
                        allowHTML: true,
                        maxWidth: 500,
                      }"
                    >
                      <span>도움말</span>
                    </button>
                  </div>
                  <div>
                    <button class="btn-s red">SQL 검증</button>
                  </div>
                </div>
                <div class="sqlAddMid">
                  <textarea></textarea>
                </div>
                <div class="sqlAddBottom">
                  <div class="custom-checkbox" style="margin-right: 5px">
                    <label>
                      <input type="checkbox" />
                      <i class="icon"></i>
                    </label>
                  </div>
                  <span
                    >향후 동일한 SQL로 조건을 지속 사용할 경우 체크해 주세요.
                    이후에는 조건 리스트 선택에서 검색하여 사용 가능합니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button
        class="btn-s red"
        @click="onConfirm"
        :disabled="(selectedRows.value?.length || 0) < 1"
      >
        적용
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { reactive } from 'vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { directive as vTippy } from 'vue-tippy';

/**
 * 탭
 */
const selectTab = ref(1);
const condNameChk = ref(true);
const tabData = ref([
  { id: 1, title: '목록에서 선택' },
  { id: 2, title: 'SQL 등록' },
]);
const onSelectTab = id => {
  selectTab.value = id;
  console.log('selectTab.value=>', selectTab.value);
};

/**
 * 검색 조건
 */
// 구분
const typeOptions = reactive([
  { label: '전체', value: 0 },
  { label: '구분#1', value: 1 },
  { label: '구분#2', value: 2 },
]);
// 조건 그룹
const groupOptions = reactive([
  { label: '전체', value: 0 },
  { label: '그룹#1', value: 1 },
  { label: '그룹#2', value: 2 },
]);
const searchData = ref({
  typeSelected: { label: '전체', value: 0 },
  groupSelected: { label: '전체', value: 0 },
  title: '',
});
// sql 등록 그룹
const putData = ref({
  condName: { label: 'condName', value: 0 },
  sqlAdd: { label: 'sql', value: 0 },
});

/**
 * 테이블
 */
const selectRadioValues = ref('');
const selectedRowData = ref({});
const tableData = ref([]);
const attachData = () => {
  tableData.value = [
    {
      id: 1,
      type: '요금제',
      prdCode: 'LPZ0000333',
      prdName: '(리얼글래스) 5G 시그니처',
      price: '118.302',
      group: '제휴요금제 그룹 A',
    },
    {
      id: 2,
      type: '요금제',
      prdCode: 'LPZ0000555',
      prdName: '(리얼글래스) 5G 시그니처',
      price: '118,100',
      group: '금액 GROUP6: 10~11만원',
    },
    {
      id: 3,
      type: '부가서비스',
      prdCode: 'LPZ0000409',
      prdName: '넷플릭스 프리미엄',
      price: '17,000',
      group: '미디어 서비스',
    },
  ];
};

attachData();
//
// const onSelectRow = value => {
//   const { id } = value;
//   selectedRowData.value = { ...value };
//   selectRadioValues.value = id;
// };

const emit = defineEmits(['cancel', 'confirm']);
const onCancel = () => {
  emit('cancel');
};

const isEll = ref([]);
const checkEllipsis = (event, index) => {
  const el = event.target;
  if (el.scrollWidth > el.clientWidth) {
    isEll.value[index] = true;
  } else {
    isEll.value[index] = false;
  }
};
const onConfirm = () => {
  emit('confirm', selectedRowData.value);
  emit('cancel');
};

// 체크박스 이벤트
const selectedRows = ref([]);
const selectAll = ref(false);
// const toggleSelectAll = () => {
//   if (selectAll.value) {
//     selectedRows.value = tableData.value.map(item => item.id);
//   } else {
//     selectedRows.value = [];
//   }
// };

const updateSelectAll = () => {
  console.log(selectedRows.value.length)
  selectAll.value = selectedRows.value.length === tableData.value.length;
};

// 행 클릭 시 선택 상태 변경
const onSelectRow = item => {
  const index = selectedRows.value.indexOf(item.id);
  if (index === -1) {
    selectedRows.value.push(item.id);
  } else {
    selectedRows.value.splice(index, 1);
  }
  updateSelectAll();
};

// 제외조건 추가 모달
const addCondName = () => {
  condNameChk.value = !condNameChk.value;
};
</script>
