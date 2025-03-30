<template>
  <div class="window-contents">
    <div class="window-header">CMS 캠페인 플로우차트 선택</div>
    <div class="window-body">
      <div class="search-table">
        <div class="search-row">
          <div class="search-box">
            <div class="search-col">
              <label>캠페인 코드</label>
              <AppInput
                style="width: 200px"
                v-model="searchData.campainCode"
                placeholder="본인의 캠페인 입력"
              />
            </div>
            <div class="search-col">
              <label>캠페인명</label>
              <AppInput
                style="width: 370px"
                v-model="searchData.campainName"
                placeholder="본인의 캠페인 입력"
              />
            </div>
            <button class="btn-search"><i class="icon"></i>조회</button>
          </div>
        </div>
        <div class="cms-campain">
          <div class="campain">
            <div class="title-row">캠페인</div>
            <div class="table-row">
              <div class="table-scroll non-header">
                <div class="table-body">
                  <table>
                    <colgroup>
                      <col width="10%" />
                      <col width="20%" />
                      <col width="" />
                    </colgroup>
                    <tbody>
                      <tr
                        v-for="(item, rowIndex) in campainData"
                        :key="item.id"
                        :class="{
                          active: item.id === campainRadioValues,
                        }"
                        @click="onSelectCampainRow(item)"
                        @mouseover="checkEllipsis($event, rowIndex)"
                      >
                        <td>
                          <div class="td-col radio">
                            <div class="custom-radio">
                              <label>
                                <input
                                  type="radio"
                                  name="campainRadio"
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
            <div class="title-row">플로우차트</div>
            <div class="table-row">
              <div class="table-scroll non-header">
                <div class="table-body">
                  <table>
                    <colgroup>
                      <col width="12%" />
                      <col width="25%" />
                      <col width="" />
                    </colgroup>
                    <tbody>
                      <tr
                        v-for="(item, rowIndex) in flowchartData"
                        :key="item.id"
                        :class="{
                          active: item.id === flowchartRadioValues,
                        }"
                        @click="onSelectFlowchartRow(item)"
                        @mouseover="checkEllipsis($event, rowIndex)"
                      >
                        <td>
                          <div class="td-col radio">
                            <div class="custom-radio">
                              <label>
                                <input
                                  type="radio"
                                  name="flowRadio"
                                  v-model="flowchartRadioValues"
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
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button
        class="btn-s red"
        @click="onConfirm"
        :disabled="campainRadioValues === '' || flowchartRadioValues === ''"
      >
        적용
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';

/**
 * 검색 조건
 */
const searchData = ref({
  campainCode: '',
  campainName: '',
});

/**
 * 테이블
 */
const campainRadioValues = ref('');
const campainRowData = ref({});
const flowchartRadioValues = ref('');
const flowchartRowData = ref({});
const campainData = ref([]);
const flowchartData = ref([]);
const attachData = () => {
  let testData1 = [];
  let testData2 = [];
  for (let i = 0; i < 100; i++) {
    const randomData = {
      id: i,
      code: 'C0000011' + 1,
      name: '요금제업셀_넷플릭스 2025년 2Q',
    };
    testData1.push(randomData);
  }
  for (let i = 0; i < 10; i++) {
    const randomData = {
      id: i,
      code: '12345' + 1,
      name: '혜택안내 1개월',
    };
    testData2.push(randomData);
  }
  campainData.value = testData1;
  flowchartData.value = testData2;
};

attachData();

const onSelectCampainRow = value => {
  const { id } = value;
  campainRowData.value = { ...value };
  campainRadioValues.value = id;
};

const onSelectFlowchartRow = value => {
  const { id } = value;
  flowchartRowData.value = { ...value };
  flowchartRadioValues.value = id;
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
  const selectData = {
    campain: campainRowData.value,
    flow: flowchartRowData.value,
  };
  emit('confirm', selectData);
  emit('cancel');
};
</script>
