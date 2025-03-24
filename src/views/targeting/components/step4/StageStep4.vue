<template>
  <StepStage :style="customBoxContentStyle">
    <ul class="targeting-detail-condition-wrap">
      <li class="left-box-inner">
        <ul class="title-card">
          <li class="title-box">제외조건 <i class="icon"></i></li>
          <li>
            <button class="btn-exc">제외조건 추가</button>
          </li>
        </ul>
        <div class="exc-body" style="overflow: auto">
          <div class="table-row">
            <div class="table-scroll" ref="tooltipContainer">
              <div class="table-header">
                <table>
                  <colgroup>
                    <col width="10%" />
                    <col width="40%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th
                        v-for="header in tableHeaders"
                        :key="header.key"
                        :style="{ textAlign: 'center' }"
                      >
                        {{ header.label }}
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table-body">
                <table>
                  <colgroup>
                    <col width="10%" />
                    <col width="40%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                  </colgroup>
                  <tbody>
                    <tr
                      v-for="(item, rowIndex) in tableData"
                      :key="item.id"
                      :style="{ textAlign: 'start' }"
                    >
                      <td
                        v-for="header in tableHeaders"
                        :key="header.key"
                        :style="{
                          textAlign:
                            header.key === 'conditionName' ? 'start' : 'center',
                        }"
                      >
                        <div class="td-col">
                          <span
                            v-if="header.key !== 'delete'"
                            :ref="
                              el => setTextElement(el, rowIndex, header.key)
                            "
                            :title="
                              isOverflow[rowIndex]?.[header.key]
                                ? item[header.key]
                                : ''
                            "
                          >
                            {{ item[header.key] }}
                          </span>
                          <button
                            v-else
                            @click="deleteItem(item.id)"
                            class="btn-delete"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="right-box-inner">
        <ul class="title-card">
          <li class="title-box">제한조건 <i class="icon"></i></li>
          <li>
            <button class="btn-limit-group" @click="addGroup">
              그룹추가 <span class="font-primary">+</span>
            </button>
          </li>
        </ul>
        <div class="limit-body" style="overflow: auto">
          <div v-for="(group, groupIndex) in groupList" :key="groupIndex" class="limit-group">
            <div class="limit-group-title">
              <span>그룹 <span class="font-primary">{{ (groupIndex + 1).toString().padStart(2, '0') }}</span></span>
              <button class="btn-limit" @click="addCondition(groupIndex)">
                제한조건 추가
              </button>
            </div>

            <!-- 데이터가 하나라도 있을 경우 -->
            <div class="limit-group-body" v-if="group.conditions.length > 0">
              <div v-for="(item, index) in group.conditions" :key="index" class="limit-group-item">
                {{ item }}
              </div>
            </div>

            <!-- 데이터가 없을 경우 -->
            <div class="limit-group-body" v-else>
              <p>데이터가 없습니다.</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </StepStage>
</template>

<script setup>
import { nextTick, onMounted, ref, toRefs, onBeforeUnmount } from 'vue';
import StepStage from '../StepStage.vue';

const tableData = ref([]);
const groupCnt = ref('01');

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  changePadding: Object,
});

const tableHeaders = ref([
  { key: 'category', label: '구분' },
  { key: 'conditionName', label: '조건명' },
  { key: 'operation', label: '연산' },
  { key: 'conditionValue', label: '조건값' },
  { key: 'delete', label: '삭제' },
]);

const deleteItem = id => {
  tableData.value = tableData.value.filter(item => item.id !== id);
};

const attachData = () => {
  let testData = [];
  for (let i = 0; i < 4; i++) {
    testData.push({
      id: i,
      category: 'AI 추천',
      conditionName: `[고객ID]상담 거부 이력(최근 3개월) - ${i}`,
      operation: '=',
      conditionValue: 'Y',
      delete: '삭제',
    });
  }
  tableData.value = testData;
};
attachData();

const textElements = ref({});
const isOverflow = ref({});

const setTextElement = (el, rowIndex, headerKey) => {
  // console.log(el);
  // console.log(rowIndex);
  // console.log(headerKey);

  if (!el) return;
  if (!textElements.value[rowIndex]) {
    textElements.value[rowIndex] = {};
  }
  textElements.value[rowIndex][headerKey] = el;
};

const checkOverflow = () => {
  const newOverflowState = {};
  Object.entries(textElements.value).forEach(([rowIndex, fields]) => {
    newOverflowState[rowIndex] = {};
    Object.entries(fields).forEach(([headerKey, el]) => {
      newOverflowState[rowIndex][headerKey] = el.scrollWidth > el.clientWidth;
    });
  });
  isOverflow.value = newOverflowState;
};

onMounted(() => {
  console.log('마운트1');
  nextTick(() => {
    checkOverflow();
  });
});

let customBoxContentStyle = ref({});

onMounted(() => {
  customBoxContentStyle.value = {
    border: 'none',
    'box-sizing': 'border-box',
    padding: '0',
  };
});

onBeforeUnmount(() => {
  customBoxContentStyle.value = {
    border: 'none',
    'box-sizing': 'border-box',
    padding: '0',
  };
});

const addCondition = groupIndex => {
  groupList.value[groupIndex].conditions = [
    ...groupList.value[groupIndex].conditions,
    `그룹추가 그룹추가 ${groupList.value[groupIndex].conditions.length + 1}`,
  ];
};

const groupList = ref([
  {
    conditions: [],
  },
]);

const addGroup = () => {
  groupList.value.push({
    conditions: [],
  });
};

const { step4 } = toRefs(props.modelValue);
</script>
