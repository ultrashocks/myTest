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
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
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
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                  </colgroup>
                  <tbody>
                    <tr
                      v-for="(item, index) in tableData"
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
                            :title="item[header.key]"
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
        <div class="limit-body">
          <div
            v-for="(group, groupIndex) in groupList"
            :key="groupIndex"
            class="limit-group"
          >
            <button class="limit-group-del" @click="deleteGroup(groupIndex)">
              <i class="icon"></i>
            </button>
            <div class="limit-group-title">
              <span
                >그룹
                <span class="font-primary">{{
                  (groupIndex + 1).toString().padStart(2, '0')
                }}</span></span
              >
              <button class="btn-limit" @click="addLimitItem(groupIndex)">
                제한조건 추가
              </button>
            </div>

            <div
              class="limit-group-body table-scroll"
              style="overflow: auto"
              v-if="group.conditions.length > 0"
            >
              <div class="table-header">
                <table>
                  <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
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
              <VueDraggable
                v-model="group.conditions"
                animation="150"
                ghostClass="ghost"
                group="limitGroup"
                @start="onDragStart"
                @end="onDragEnd"
              >
                <div
                  v-for="(item, index) in group.conditions"
                  :key="groupIndex + '' + index"
                  class="limit-group-item"
                >
<!--                  <div class="table-body">-->
<!--                    <table>-->
<!--                      <colgroup>-->
<!--                        <col width="20%" />-->
<!--                        <col width="20%" />-->
<!--                        <col width="20%" />-->
<!--                        <col width="20%" />-->
<!--                        <col width="20%" />-->
<!--                      </colgroup>-->
<!--                      <tbody>-->
<!--                        <tr style="text-align: start">-->
<!--                          <td style="text-align: center">-->
<!--                            <div class="td-col">-->
<!--                              <span title="">AI 추천</span>-->
<!--                            </div>-->
<!--                          </td>-->
<!--                          <td style="text-align: start">-->
<!--                            <div class="td-col">-->
<!--                              <span-->
<!--                                title="[고객ID]상담 거부 이력(최근 3개월) - 0"-->
<!--                                >[고객ID]상담 거부 이력(최근 3개월) - 0</span-->
<!--                              >-->
<!--                            </div>-->
<!--                          </td>-->
<!--                          <td style="text-align: center">-->
<!--                            <div class="td-col"><span title="">=</span></div>-->
<!--                          </td>-->
<!--                          <td style="text-align: center">-->
<!--                            <div class="td-col"><span title="">Y</span></div>-->
<!--                          </td>-->
<!--                          <td style="text-align: center">-->
<!--                            <div class="td-col">-->
<!--                              <button class="btn-delete">삭제</button>-->
<!--                            </div>-->
<!--                          </td>-->
<!--                        </tr>-->
<!--                      </tbody>-->
<!--                    </table>-->
<!--                  </div>-->
                  <component :is="item.render" />
                </div>
              </VueDraggable>
            </div>

            <ul class="limit-no-group-body" v-else>
              <li class="">
                <div class="limit-img"></div>
              </li>
              <li
                class="d-flex flex-column col-12 gap-8px"
                style="font-size: 13px; font-weight: 600"
              >
                <span
                  >다른 그룹의 조건을 드래그 앤 드롭으로 옮길 수 있습니다.</span
                >
                <span>그룹과 그룹은 기본 OR 조건으로 설정됩니다.</span>
                <span
                  >그룹에 조건이 담긴 상태에서 그룹을 삭제하시면 조건도
                  삭제됩니다.</span
                >
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </StepStage>
</template>

<script setup>
import {
  nextTick,
  onMounted,
  ref,
  toRefs,
  onBeforeUnmount,
  h,
  watch,
} from 'vue';
import StepStage from '../StepStage.vue';
import { VueDraggable } from 'vue-draggable-plus';

const tableData = ref([]);
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  changePadding: Object,
});

// item()의 반환값을 JSON으로 처리하여 컴포넌트를 반환
const getComponentFromJson = json => {
  console.log(json);
};

const tableHeaders = ref([
  { key: 'category', label: '구분' },
  { key: 'conditionName', label: '조건명' },
  { key: 'operation', label: '연산' },
  { key: 'conditionValue', label: '조건값' },
  { key: 'delete', label: '삭제' },
]);

const deleteItem = id => {
  console.log(id);
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

  // console.log(tableData)
  // console.log("tableData")
};
attachData();

let customBoxContentStyle = ref({});

const addLimitItem = groupIndex => {
  // 대체 머가 다른거야
  groupList.value[groupIndex].conditions.push({
    id: Date.now(),
    type: 'function',
    render: () => {
      return h('div', { class: 'table-body' }, [
        h(
          'div',
          {
            class: 'd-flex justify-center align-center btn-case',
            style: 'height: 36px; font-weight: 500; background-color: #FFFFFF',
          },
          [
            h(
              'div',
              {
                class: 'bg-blusG_100',
                style: '',
              },
              [
                h(
                  'button',
                  {
                    class:
                      'font-size-12 font-color-blusG_400 h-18px ps-10px pe-8px btn-chk-type01 active',
                    style: '',
                    onClick: $this => {
                      btnAndOrEvent($this);
                    },
                  },
                  [`AND`],
                ),
              ],
            ),
            h(
              'div',
              {
                class: 'bg-blusG_100',
                style: '',
              },
              [
                h(
                  'button',
                  {
                    class:
                      'font-size-12 font-color-blusG_400 h-18px pe-10px ps-8px btn-chk-type01',
                    style: '',
                    onClick: $this => {
                      btnAndOrEvent($this);
                    },
                  },
                  [`OR`],
                ),
              ],
            ),
          ],
        ),
        h('table', {}, [
          h('colgroup', {}, [
            h('col', { width: '20%' }),
            h('col', { width: '20%' }),
            h('col', { width: '20%' }),
            h('col', { width: '20%' }),
            h('col', { width: '20%' }),
          ]),
          h('tbody', {}, [
            h('tr', { style: 'text-align: start;' }, [
              h('td', { style: 'text-align: center;' }, [
                h('div', { class: 'td-col' }, [
                  h('span', { title: '' }, 'AI 추천'),
                ]),
              ]),
              h('td', { style: 'text-align: start;' }, [
                h('div', { class: 'td-col' }, [
                  h(
                    'span',
                    { title: '[고객ID]상담 거부 이력(최근 3개월) - 0' },
                    '[고객ID]상담 거부 이력(최근 3개월) - 0',
                  ),
                ]),
              ]),
              h('td', { style: 'text-align: center;' }, [
                h('div', { class: 'td-col' }, [h('span', { title: '' }, '=')]),
              ]),
              h('td', { style: 'text-align: center;' }, [
                h('div', { class: 'td-col' }, [h('span', { title: '' }, 'Y')]),
              ]),
              h('td', { style: 'text-align: center;' }, [
                h('div', { class: 'td-col' }, [
                  h(
                    'button',
                    {
                      class: 'btn-delete',
                      onClick: $this => {
                        deleteGroupItem($this, groupIndex);
                      },
                    },
                    ' 삭제 ',
                  ),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]);
    },
  });
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
const btnAndOrEvent = $this => {
  if (!$this.currentTarget.classList.contains('active')) {
    const activeParent = $this.currentTarget.closest('.btn-case');
    if (activeParent) {
      activeParent.querySelector('.active').classList.remove('active');
    }
    $this.currentTarget.classList.add('active');
  }
};

// 그룹 삭제
const deleteGroup = groupIndex => {
  groupList.value.splice(groupIndex, 1);
};

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

// 그룹의 제한조건 추가 삭제 될떄 감지e 요소를 삭제하는 함수
const removeBtnCase = () => {
  nextTick(() => {
    document.querySelectorAll('.limit-group-body').forEach(groupBody => {
      if (groupBody) {
        const firstGroupItem = groupBody.querySelector(
          '.limit-group-item .table-body',
        );
        if (firstGroupItem) {
          const firstDiv = firstGroupItem.querySelector('div');
          if (firstDiv && firstDiv.classList.contains('btn-case')) {
            firstDiv.remove();
          }
        }
      }
    });
  });
};

// 그룹의 제한조건 삭제
const deleteGroupItem = ($this, groupIndex) => {
  console.log($this);
  console.log(groupIndex);
  nextTick(() => {
    const itemElement = $this.target.closest('.limit-group-item');
    const groupBody = itemElement.closest('.limit-group-body');
    itemElement.remove();
    const tableHeader = groupBody.querySelector('.table-header');
    if (
      groupBody &&
      tableHeader &&
      groupBody.querySelectorAll('.limit-group-item').length === 0
    ) {
      tableHeader.remove();
      groupList.value[groupIndex].conditions = [];
    }
    removeBtnCase();
  });
};

// groupList가 변경될 때마다 실행
// 로우 맨위에 조건식 붙은거 삭제하려고 만듬
watch(
  groupList,
  () => {
    removeBtnCase();
  },
  { deep: true },
);

const onDragStart = event => {
  console.log('드래그 시작!', {
    item: event.item, // 드래그한 DOM 요소
    index: event.oldIndex, // 원래 위치
  });

  console.dir(event); // 콘솔에서 전체 객체 확인
  removeBtnCase();
};
const onDragEnd = event => {
  removeBtnCase();
  console.log('드래그 종료:', event);
};

const { step4 } = toRefs(props.modelValue);
</script>
