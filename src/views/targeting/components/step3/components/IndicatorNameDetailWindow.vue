<template>
  <div class="window-contents">
    <div class="window-header">
      상품 조회
      <button
        class="btn-info"
        v-tippy="{
          content:
            '하나의 상품코드가 여러 그룹에 속할 수 있으니 그룹을 보시고, 선택해 주십시오.<br>선택한 상품 그룹의 모든 상품이 타겟 추천 및 성과 측정에 포함됩니다.<br>타겟 추천 및 성과 측정에 원치 않은 상품은 제외조건에서 <br>&quot;To-be 요금제 제외 목록&quot; 조건의 조건값에 상품코드를 입력하여 제외해주시기 바랍니다.',
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
              :class="{ active: selectTab == item.id }"
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
                  <col width="25%" />
                  <col width="10%" />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>구분</th>
                    <th>상품코드</th>
                    <th>상품명</th>
                    <th>그룹명</th>
                    <th>기본료</th>
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
                  <col width="25%" />
                  <col width="10%" />
                </colgroup>
                <tbody>
                  <tr
                    v-for="(item, rowIndex) in tableData"
                    :key="item.id"
                    :class="{ active: item.id === selectRadioValues }"
                    @click="onSelectRow(item)"
                    @mouseover="checkEllipsis($event, rowIndex)"
                  >
                    <td>
                      <div class="td-col radio">
                        <div class="custom-radio">
                          <label>
                            <input
                              type="radio"
                              name="radioSelect"
                              v-model="selectRadioValues"
                              :value="item.id"
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
                    <td class="td-left">
                      <div
                        class="td-col"
                        :title="isEll[rowIndex] ? item.group : ''"
                      >
                        {{ item.group }}
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
                  </tr>
                </tbody>
              </table>
              <!-- 조회 결과가 없는경우에 보이게 처리 -->
              <!-- <div class="non-table__data">
              <div class="msg-box">
                <i class="icon"></i>
                <div class="msg">조회 정보가 없습니다.</div>
              </div>
            </div> -->
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
        :disabled="selectRadioValues === ''"
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
import { onMounted, onUnmounted } from 'vue';
// import { useAlert } from '@/composables/alert';
// const { setAlertStatus } = useAlert();
import { directive as vTippy } from 'vue-tippy';

/**
 * 탭
 */
const selectTab = ref(1);
const tabData = ref([
  { id: 1, title: '모바일' },
  { id: 2, title: '홈' },
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

/**
 * 테이블
 */
const selectRadioValues = ref('');
const selectedRowData = ref({});
const tableData = ref([]);
const attachData = () => {
  /*  let testData = [];
  for (let i = 0; i < 100; i++) {
    const randomData = {
      id: i,
      activity: 'up-sell',
      service: '모바일',
      marketingCode: 'MK00' + i,
      marketingName:
        '모바일 요금제 x VAS 업셀 모바일 요금제 x VAS 업셀 모바일 요금제x VAS 업셀 모바일 요금제 x VAS 업셀',
    };
    testData.push(randomData);
  }
  tableData.value = testData; */
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

const onSelectRow = value => {
  const { id } = value;
  selectedRowData.value = { ...value };
  selectRadioValues.value = id;
};

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
</script>
