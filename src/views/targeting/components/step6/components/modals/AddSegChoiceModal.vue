<template>
  <div class="window-contents">
    <div class="window-header">
      세그 선택
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
          <div class="seg-campain">
            <div class="campain">
              <div class="title-row">[세그 구분]조건그룹 > 세그명</div>
              <div class="table-row">
                <div class="table-scroll non-header">
                  <div class="table-body">
                    <table>
                      <colgroup>
                        <col width="10%" />
                        <col width="20%" />
                        <col width="30" />
                      </colgroup>
                      <tbody>
                        <tr
                          v-for="(item, rowIndex) in segGroup"
                          :key="item.id"
                          :class="{
                            active: item.id === campainRadioValues,
                          }"
                          @click="onSelectSegGroupRow(item)"
                          @mouseover="checkEllipsis($event, rowIndex)"
                        >
                          <td>
                            <div class="td-col radio">
                              <div class="custom-radio">
                                <label>
                                  <input
                                    type="radio"
                                    name="segGroupRadio"
                                    v-model="campainRadioValues"
                                    :value="item.id"
                                  />
                                  <i class="icon"></i>
                                </label>
                              </div>
                            </div>
                          </td>
                          <td class="td-left">
                            <div class="td-col">{{ item.code }}</div>
                          </td>
                          <td class="td-left">
                            <div class="td-col">></div>
                          </td>
                          <td class="td-left">
                            <div
                              class="td-col"
                              :title="isEll[rowIndex] ? item.name : ''"
                            >
                              {{ item.name }}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="flow-chart">
              <div class="title-row">세그 상세 구분</div>
              <div class="table-row">
                <div class="table-scroll non-header">
                  <div class="table-body">
                    <table>
                      <colgroup>
                        <col width="12%" />
                        <col width="55%" />
                      </colgroup>
                      <tbody>
                        <tr
                          v-for="(item, rowIndex) in segDetail"
                          :key="item.id"
                          :class="{
                            active: item.id === segDetailData,
                          }"
                          @click="onSelectSegDetailRow(item)"
                          @mouseover="checkEllipsis($event, rowIndex)"
                        >
                          <td>
                            <div class="td-col radio">
                              <div class="custom-radio">
                                <label>
                                  <input
                                    type="radio"
                                    name="flowRadio"
                                    v-model="segDetailData"
                                    :value="item.id"
                                  />
                                  <i class="icon"></i>
                                </label>
                              </div>
                            </div>
                          </td>
                          <td class="td-left">
                            <div
                              class="td-col"
                              :title="isEll[rowIndex] ? item.name : ''"
                            >
                              {{ item.name }}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 비율 (%) 탭 -->
        <div v-else-if="selectTab === 2">
          <div class="search-row">
            <div class="search-box">
              <div class="search-col">
                <label>세그 개수</label>
                <AppSelectBox
                  :options="createSegOptions"
                  v-model:optionsSelected="searchData.segCntSelected"
                  style="width: 114px"
                />
              </div>
              <button
                class="btn-search"
                @click="createSegCnt(searchData.segCntSelected)"
              >
                생성
              </button>
            </div>
          </div>
          <!-- 두분쨰 비율 모달창 수정 -->
          <div class="seg-ratio">
            <div class="ratio">
              <div class="title-row">
                <div class="">세그명<span>(선택)</span></div>
                <div class="">세그 비율</div>
              </div>
              <div class="table-row">
                <div class="table-scroll non-header">
                  <div class="table-body">
                    <div class="selectTab02">
                      <div
                        v-if="ratioData.length === 0"
                        class="text-center py-4 text-gray-500 d-flex flex-column justify-center align-center"
                        style="margin-top: 120px"
                      >
                        <div class="info-img">
                          <i class="icon"></i>
                        </div>
                        <div>세그를 먼저 생성해 주세요.</div>
                      </div>

                      <div
                        class="row d-flex justify-between"
                        v-for="(item, rowIndex) in ratioData"
                        :key="rowIndex"
                      >
                        <div class="left" style="max-width: 500px; width: 100%">
                          <input
                            class="left-01"
                            style="width: 100%"
                            type="text"
                            v-model="item.name"
                            placeholder="20자까지 가능"
                          />
                        </div>
                        <div
                          class=""
                          style="max-width: 332px; width: 100%; display: flex"
                        >
                          <input
                            class="left-02 mr-8"
                            style="width: 100%"
                            type="number"
                            v-model="item.cnt"
                            placeholder="숫자만 입력"
                          />
                          <span
                            class="font-size-16 d-flex flex-column justify-center"
                            >%</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="seg-warring">
                  세그 비율의 합은 100이어야 합니다.
                </div>
              </div>
            </div>

            <div class="seg-info">
              <div class="seg-info-img">
                <i class="icon"></i>
              </div>
              세그명은 선택 입력 사항으로 입력하지 않으시면, 고객세그1,
              고객세그2... 로 자동 생성됩니다.
            </div>
          </div>
        </div>
        <!-- SQL 등록 탭 -->
        <div v-else>
          <div class="add-row">
            <div class="add-box">
              <div class="sqlAddWrap">
                <div class="d-flex align-center justify-between">
                  <div class="d-flex align-center mb8">
                    <span
                      class="font-size-18 font-weight-600 text-nowrap font-secondary"
                      >SQL 입력</span
                    >
                    <button
                      class="btn-info"
                      v-tippy="{
                        content:
                          'SQL 작성 시 주의 사항 <br> 1) SELECT 절에는 최종적으로 ENTR_NO, CUST_NO 컬럼만 있어야 합니다.(타사 고객의 경우 ENTR_NO 대신 DCMP_CUST_ID) <br>2) From절에는 “qcp-prod-edp-lake” 의 테이블만 사용가능합니다.',
                        placement: 'right-start',
                        allowHTML: true,
                        maxWidth: 300,
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
                  <textarea v-model="sqlText"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="window-footer" v-if="selectTab === 1">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button
        class="btn-s red"
        @click="onConfirmTab01"
        :disabled="Object.keys(segDetailRowData).length < 1"
      >
        적용
      </button>
    </div>
    <div class="window-footer" v-else>
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button
        class="btn-s red"
        @click="onConfirmTab02"
      >
        적용
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue';
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
  { id: 2, title: '비율 (%)' },
  { id: 3, title: 'SQL 등록' },
]);
const onSelectTab = id => {
  selectTab.value = id;
};

const prop = defineProps({
  groupIndex: {
    type: Number,
    default: 0,
    required: true,
  },
});

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
// 생성 세그 카운트
const createSegOptions = reactive([
  { label: '선택', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
]);

const searchData = ref({
  typeSelected: { label: '전체', value: 0 },
  groupSelected: { label: '전체', value: 0 },
  segCntSelected: { label: '선택', value: 0 },
  title: '',
});

/**
 * 테이블
 */
const campainRadioValues = ref('');
const segGroupRowData = ref({});
const segDetailData = ref('');
const segDetailRowData = ref({});
const segGroup = ref([]);
const segDetail = ref([]);

//데이터를 불러 왔다는 가정하에 작업
const rdoList01 = () => {
  //axios 호출

  segGroup.value = [
    { id: 1, code: '[고객ID] 고객', name: '연령대' },
    { id: 2, code: '[고객ID] 고객', name: '성별' },
    { id: 3, code: '[가입번호] 상품', name: '요금제' },
    { id: 4, code: '[고객ID] 고객', name: '가입기간' },
    { id: 5, code: '[가입번호] 상품', name: '결합' },
    { id: 11, code: '[고객ID] 고객', name: '연령대' },
    { id: 12, code: '[고객ID] 고객', name: '성별' },
    { id: 13, code: '[가입번호] 상품', name: '요금제' },
    { id: 14, code: '[고객ID] 고객', name: '가입기간' },
    { id: 15, code: '[가입번호] 상품', name: '결합' },
    { id: 21, code: '[고객ID] 고객', name: '연령대' },
    { id: 22, code: '[고객ID] 고객', name: '성별' },
    { id: 23, code: '[가입번호] 상품', name: '요금제' },
    { id: 24, code: '[고객ID] 고객', name: '가입기간' },
    { id: 25, code: '[가입번호] 상품', name: '결합' },
  ];
};

const rdoList02 = rowId => {
  const dataArr = [];

  if (rowId === 1) {
    dataArr.push(
      { id: 1, code: 'C00000111', name: '5살 단위' },
      { id: 101, code: 'C00000112', name: '10살 단위' },
    );
  } else if (rowId === 11) {
    dataArr.push(
      { id: 11, code: 'C00000121', name: '11요금제업셀_넷플릭스 2025년 2Q' },
      { id: 111, code: 'C00000122', name: '11요금제업셀_넷플릭스 1차안' },
    );
  } else if (rowId === 21) {
    dataArr.push(
      { id: 21, code: 'C00000131', name: '21요금제업셀_넷플릭스 2025년 2Q' },
      { id: 121, code: 'C00000132', name: '21요금제업셀_넷플릭스 1차안' },
      { id: 221, code: 'C00000133', name: '21요금제업셀_넷플릭스 2차안' },
    );
  } else if (rowId === 2) {
    dataArr.push({ id: 2, code: 'C00000211', name: '남성 여성' });
  } else if (rowId === 12) {
    dataArr.push(
      { id: 12, code: 'C00000221', name: '12요금제업셀_게임시리즈 2025년 2Q' },
      { id: 112, code: 'C00000222', name: '12요금제업셀_게임시리즈 1차안' },
      { id: 212, code: 'C00000223', name: '12요금제업셀_게임시리즈 2차안' },
    );
  } else if (rowId === 22) {
    dataArr.push(
      { id: 22, code: 'C00000231', name: '22요금제업셀_게임시리즈 2025년 2Q' },
      { id: 122, code: 'C00000232', name: '22요금제업셀_게임시리즈 1차안' },
      { id: 222, code: 'C00000233', name: '22요금제업셀_게임시리즈 2차안' },
    );
  } else if (rowId === 3) {
    dataArr.push(
      { id: 3, code: 'C00000311', name: '3요금제업셀_디즈니+ 2025년 2Q' },
      { id: 103, code: 'C00000312', name: '3요금제업셀_디즈니+ 1차안' },
      { id: 203, code: 'C00000313', name: '3요금제업셀_디즈니+ 2차안' },
    );
  } else if (rowId === 13) {
    dataArr.push(
      { id: 13, code: 'C00000321', name: '13요금제업셀_디즈니+ 2025년 2Q' },
      { id: 113, code: 'C00000322', name: '13요금제업셀_디즈니+ 1차안' },
      { id: 213, code: 'C00000323', name: '13요금제업셀_디즈니+ 2차안' },
    );
  } else if (rowId === 23) {
    dataArr.push(
      { id: 23, code: 'C00000331', name: '23요금제업셀_디즈니+ 2025년 2Q' },
      { id: 123, code: 'C00000332', name: '23요금제업셀_디즈니+ 1차안' },
      { id: 223, code: 'C00000333', name: '23요금제업셀_디즈니+ 2차안' },
    );
  } else if (rowId === 4) {
    dataArr.push(
      { id: 4, code: 'C00000411', name: '4요금제업셀_왓챠 2025년 2Q' },
      { id: 104, code: 'C00000412', name: '4요금제업셀_왓챠 1차안' },
      { id: 204, code: 'C00000413', name: '4요금제업셀_왓챠 2차안' },
    );
  } else if (rowId === 14) {
    dataArr.push(
      { id: 14, code: 'C00000421', name: '14요금제업셀_왓챠 2025년 2Q' },
      { id: 114, code: 'C00000422', name: '14요금제업셀_왓챠 1차안' },
      { id: 214, code: 'C00000423', name: '14요금제업셀_왓챠 2차안' },
    );
  } else if (rowId === 24) {
    dataArr.push(
      { id: 24, code: 'C00000431', name: '24요금제업셀_왓챠 2025년 2Q' },
      { id: 124, code: 'C00000432', name: '24요금제업셀_왓챠 1차안' },
      { id: 224, code: 'C00000433', name: '24요금제업셀_왓챠 2차안' },
    );
  } else if (rowId === 5) {
    dataArr.push(
      { id: 5, code: 'C00000511', name: '5요금제업셀_티빙 2025년 2Q' },
      { id: 105, code: 'C00000512', name: '5요금제업셀_티빙 1차안' },
      { id: 205, code: 'C00000513', name: '5요금제업셀_티빙 2차안' },
    );
  } else if (rowId === 15) {
    dataArr.push(
      { id: 15, code: 'C00000521', name: '15요금제업셀_티빙 2025년 2Q' },
      { id: 115, code: 'C00000522', name: '15요금제업셀_티빙 1차안' },
      { id: 215, code: 'C00000523', name: '15요금제업셀_티빙 2차안' },
    );
  } else if (rowId === 25) {
    dataArr.push(
      { id: 25, code: 'C00000531', name: '25요금제업셀_티빙 2025년 2Q' },
      { id: 125, code: 'C00000532', name: '25요금제업셀_티빙 1차안' },
      { id: 225, code: 'C00000533', name: '25요금제업셀_티빙 2차안' },
    );
  }

  segDetail.value = dataArr;
};

rdoList01();

const onSelectSegGroupRow = value => {
  const { id } = value;
  rdoList02(id);
  segGroupRowData.value = { ...value };
  campainRadioValues.value = id;
};

const onSelectSegDetailRow = value => {
  const { id } = value;
  segDetailRowData.value = { ...value };
  segDetailData.value = id;
};

const emit = defineEmits(['cancel', 'callBeck']);
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

const onConfirmTab01 = () => {
  // 어차피 라디오 버튼이라 한건이기 떄문에 배열이 아닌 객체로 내려줍니다.
  const selectData = {
    group: segGroupRowData.value,
    detailData: segDetailRowData.value,
  };

  emit('callBeck', selectData, prop.groupIndex);
  emit('cancel');
};

// 체크박스 이벤트
const selectedRows = ref([]);
const selectCnt = ref(0);
const sqlText = ref('');
const isTextEntered = ref(false);

watchEffect(() => {
  selectCnt.value = selectedRows.value.length;
  isTextEntered.value = sqlText.value.trim().length > 0;
});

// 비율탭 세그 추가 이벤트
const ratioData = ref([]);

const createSegCnt = target => {
  const count = Number(target.value);

  // 기존 값 초기화하고 새로 채움
  ratioData.value = Array.from({ length: count }, () => ({
    id: Math.floor(Math.random() * 100000),
    name: '',
    cnt: '',
  }));
};

const onConfirmTab02 = () => {
  // 최대 10개의 로우
  emit('callBeck', { customSegData: ratioData.value }, prop.groupIndex);
  emit('cancel');
};
</script>
