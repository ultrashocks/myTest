<template>
  <StepStage :style="customBoxContentStyle">
    <LoaderScene v-if="displayYn" v-model:displayYn="displayYn"></LoaderScene>
    <ul v-else class="targeting-detail-condition-wrap">
      <li class="mosu-chk-btn-wrap">
        <div class="mosu-chk-btn" @click="displayYn = true">모수 체크</div>
        <div class="mosu-chk-btn-noti">
          <i class="icon"></i>타겟 추전 전에 “모수 체크”는 필수 확인 사항입니다.
        </div>
      </li>
      <li class="left-box-inner">
        <ul class="title-card">
          <li class="title-box">
            제외조건
            <button
              class="btn-info ml0"
              v-tippy="{
                content:
                  '도움말<br>도움말<br>도움말 <br>&quot;도움말&quot;도움말',
                placement: 'right-start',
                allowHTML: true,
                maxWidth: 500,
              }"
            >
              <span>도움말</span>
            </button>
          </li>
          <li>
            <button class="btn-exc" @click="onExCondAddModal">
              제외조건 추가
            </button>
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
                      v-for="item in tableData"
                      :key="item.id"
                      :style="{ textAlign: 'start' }"
                    >
                      <td style="text-align: center">
                        <div class="td-col">
                          <span
                            title=""
                            :class="{ 'font-primary': item.category === '+' }"
                            >{{ item.category }}</span
                          >
                        </div>
                      </td>
                      <td class="text-start text-overflow-nowrap">
                        <div class="td-col">
                          <span v-bind:title="item.conditionName">
                            {{ item.conditionName }}
                          </span>
                        </div>
                      </td>
                      <td style="text-align: center">
                        <div class="td-col">
                          <span
                            v-if="changeCondGo !== item.id"
                            @dblclick="startEditing(item.id)"
                          >
                            {{ item.operation }}
                          </span>
                          <select
                            v-else
                            v-model="item.operation"
                            @change="event => saveOperation(item, event)"
                            @blur="changeCondGo = null"
                          >
                            <option
                              v-for="option in operationOptions"
                              :key="option.value"
                              :value="option.value"
                            >
                              {{ option.value }}
                            </option>
                          </select>
                        </div>
                      </td>
                      <td style="text-align: center">
                        <div class="td-col">
                          <span
                            v-bind:title="item.conditionValue"
                            v-if="changeTextGo !== item.id"
                            @dblclick="startTextGo(item.id)"
                          >
                            {{ item.conditionValue }}
                          </span>
                          <input
                            v-else
                            v-model="item.conditionValue"
                            @blur="saveText(item)"
                            @keydown.enter="saveText(item)"
                            class="custom-cond-input"
                          />
                        </div>
                      </td>
                      <td style="text-align: center">
                        <div class="td-col">
                          <button
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
          <li class="title-box">
            제한조건
            <button
              class="btn-info ml0"
              v-tippy="{
                content:
                  '도움말<br>도움말<br>도움말 <br>&quot;도움말&quot;도움말',
                placement: 'right-start',
                allowHTML: true,
                maxWidth: 500,
              }"
            >
              <span>도움말</span>
            </button>
          </li>
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
            <ul class="conditions-btn" v-if="groupIndex !== 0">
              <li class="top-cond" @click="selectedConditions($event)">
                AND <i class="icon"></i>
              </li>
              <li class="bottom-cond" @click="choiceConditions($event)">
                OR <i class="icon opacity-0"></i>
              </li>
            </ul>
            <button class="limit-group-del" @click="deleteGroup(groupIndex)">
              <i class="icon"></i>
            </button>
            <div class="limit-group-title">
              <span
                >그룹
                <span class="font-primary">{{
                  (groupIndex + 1).toString().padStart(2, '0')
                }}</span>
              </span>
              <button
                class="btn-limit"
                @click="onLimitCondAddModal(groupIndex, $event)"
              >
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
                @end="endDrag"
              >
                <div
                  v-for="(item, index) in group.conditions"
                  :key="index"
                  class="limit-group-item"
                >
                  <div class="table-body">
                    <div
                      class="d-flex justify-center align-center btn-case"
                      v-if="index !== 0"
                    >
                      <div class="bg-blusG_100" style="">
                        <button
                          class="font-size-12 font-color-blusG_400 h-18px ps-10px pe-8px btn-chk-type01 type-and active"
                          @click="btnAndOrEvent($event, true)"
                        >
                          AND
                        </button>
                      </div>
                      <div class="bg-blusG_100" style="">
                        <button
                          class="font-size-12 font-color-blusG_400 h-18px pe-10px ps-8px btn-chk-type01 type-or"
                          @click="btnAndOrEvent($event, false)"
                        >
                          OR
                        </button>
                      </div>
                    </div>
                    <table>
                      <colgroup>
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                      </colgroup>
                      <tbody>
                        <tr style="text-align: start">
                          <td class="" style="display: none">{{ item.id }}</td>
                          <td style="text-align: center">
                            <div class="td-col">
                              <span
                                title=""
                                :class="{
                                  'font-primary': item.category === '+',
                                }"
                                >{{ item.category }}</span
                              >
                            </div>
                          </td>
                          <td class="text-start text-overflow-nowrap">
                            <div class="td-col">
                              <span v-bind:title="item.conditionName">
                                {{ item.conditionName }}
                              </span>
                            </div>
                          </td>
                          <td style="text-align: center">
                            <div class="td-col">
                              <span
                                v-if="changeCondGo !== item.id"
                                @dblclick="startEditing(item.id)"
                              >
                                {{ item.operation }}
                              </span>
                              <select
                                v-else
                                v-model="item.operation"
                                @change="event => saveOperation(item, event)"
                                @blur="changeCondGo = null"
                              >
                                <option
                                  v-for="option in operationOptions"
                                  :key="option.value"
                                  :value="option.value"
                                >
                                  {{ option.value }}
                                </option>
                              </select>
                            </div>
                          </td>
                          <td style="text-align: center">
                            <div class="td-col">
                              <span
                                v-bind:title="item.conditionValue"
                                v-if="changeTextGo !== item.id"
                                @dblclick="startTextGo(item.id)"
                              >
                                {{ item.conditionValue }}
                              </span>
                              <input
                                v-else
                                v-model="item.conditionValue"
                                @blur="saveText(item)"
                                @keydown.enter="saveText(item)"
                                class="custom-cond-input"
                              />
                            </div>
                          </td>
                          <td style="text-align: center">
                            <div class="td-col">
                              <button
                                class="btn-delete"
                                @click="
                                  deleteGroupItem($event, groupIndex, item.id)
                                "
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
              </VueDraggable>
            </div>
            <VueDraggable
              v-model="group.conditions"
              animation="150"
              ghostClass="ghost"
              group="limitGroup"
              filter=".limit-no-group-body"
              @dragover="onDragover"
              v-else
            >
              <ul class="limit-no-group-body">
                <li class="">
                  <div class="limit-img"></div>
                </li>
                <li
                  class="d-flex flex-column col-12 gap-8px"
                  style="font-size: 13px; font-weight: 600"
                >
                  <span
                    >다른 그룹의 조건을 드래그 앤 드롭으로 옮길 수
                    있습니다.</span
                  >
                  <span>그룹과 그룹은 기본 OR 조건으로 설정됩니다.</span>
                  <span
                    >그룹에 조건이 담긴 상태에서 그룹을 삭제하시면 조건도
                    삭제됩니다.</span
                  >
                </li>
              </ul>
            </VueDraggable>
          </div>
        </div>
        <!-- 제외조건 추가 모달 -->
        <AppWindow
          v-model:view="openViewExCondAddModal"
          width="895px"
          height="676px"
        >
          <ExCondAddModal
            @cancel="openViewExCondAddModal = false"
            @callBeck="onExCondAddModalData"
          />
        </AppWindow>
        <!-- 제한조건 추가 모달 -->
        <AppWindow
          v-model:view="openViewLimitCondAddModal"
          width="895px"
          height="676px"
        >
          <LimitCondAddModal
            v-model:groupIndex="groupIndex"
            v-model:div="elDiv"
            @cancel="openViewLimitCondAddModal = false"
            @callBeck="onLimitCondAddModalData"
          />
        </AppWindow>
      </li>
    </ul>
  </StepStage>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue';
import StepStage from '../StepStage.vue';
import { VueDraggable } from 'vue-draggable-plus';
import LoaderScene from '@/views/targeting/components/step4/components/LoaderScene.vue';
import { directive as vTippy } from 'vue-tippy';
import AppWindow from '@/components/ui/AppWindow.vue';
import ExCondAddModal from '@/views/targeting/components/step4/components/modals/ExCondAddModal.vue';
import LimitCondAddModal from '@/views/targeting/components/step4/components/modals/LimitCondAddModal.vue';

const tableData = ref([]);
const displayYn = ref(false);

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
  // removeFirstBtnCase();
};

const attachData = () => {
  let testData = [];
  for (let i = 0; i < 4; i++) {
    testData.push({
      id: i,
      category: 'AI 추천',
      conditionName: `[고객ID- ${i}]상담 거부 이력(최근 3개월)`,
      operation: '=',
      conditionValue: 'Y',
    });
  }
  tableData.value = testData;
};
attachData();

let customBoxContentStyle = ref({});

// const addLimitItem = (groupIndex, div) => {
//   // 해당 그룹의 인덱스 가지고 모달을 띄움
//   // 선택한 모달에서 타겟그룹 인덱스 가지고 감\
//
//   const testData = {
//     id: groupIndex + '' + Date.now() || 0,
//     category: '+',
//     conditionName: `${
//       groupIndex + '' + Date.now() || 0
//     } - [고객ID]상담 거부 이력(최근 3개월)`,
//     operation: '=',
//     conditionValue: 'Y',
//   };
//
//   groupList.value[groupIndex].conditions.push(testData);
//
//   // 생성시 스크롤 맨 아래로 이동
//   const container = div.currentTarget.closest('.limit-group');
//   const scrollElement = container?.querySelector('.table-scroll');
//   setTimeout(() => {
//     if (scrollElement) {
//       scrollElement.scrollTo({
//         top: scrollElement.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }, 0);
// };

// 최초에 AI추천이 들어올때
const initLimitItem = () => {
  // 데이터 받은거 여기에 적재 하셔요.
  // 키값은 컬럼에 맞게 바꿔주시면 됩니다!
  for (let i = 0; i <= 2; i++) {
    const testData = {
      id: 0 + '' + i + '' + Date.now() || 0,
      category: 'AI 추천',
      conditionName: `${
        11 + ' AI 추천 ' + 11 || 0
      } - [고객ID]상담 거부 이력(최근 3개월)`,
      operation: i === 0 ? '=' : i === 1 ? '<' : '>',
      conditionValue: i === 0 ? 'Y' : i === 1 ? 'N' : '무엇이 들어가나요',
    };
    groupList.value[0].conditions.push(testData);
  }
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
const btnAndOrEvent = ($this, and) => {
  // and 전체
  if (and) {
    const limitGroup = $this.currentTarget.closest('.limit-group-body');
    limitGroup.querySelectorAll('.btn-case').forEach(btnCase => {
      btnCase.querySelectorAll('.active').forEach(target => {
        target.classList.remove('active');
      });
      btnCase.querySelectorAll('.type-and').forEach(target => {
        target.classList.add('active');
      });
    });
  }
  // else if (!$this.currentTarget.classList.contains('active')) {
  //   const activeParent = $this.currentTarget.closest('.btn-case');
  //   if (activeParent) {
  //     activeParent.querySelector('.active').classList.remove('active');
  //   }
  //   $this.currentTarget.classList.add('active');
  // }
  else {
    const limitGroup = $this.currentTarget.closest('.limit-group-body');
    limitGroup.querySelectorAll('.btn-case').forEach(btnCase => {
      console.log(btnCase);
      btnCase.querySelectorAll('.active').forEach(target => {
        target.classList.remove('active');
      });
      btnCase.querySelectorAll('.type-or').forEach(target => {
        target.classList.add('active');
      });
    });
  }
};

// 그룹 삭제R
const deleteGroup = groupIndex => {
  groupList.value.splice(groupIndex, 1);
};

// 그룹의 제한조건 삭제
// limit-group-item의 유니크한 id로 배열에서도 같이 삭제
const deleteGroupItem = ($this, groupIndex, id) => {
  nextTick(() => {
    const itemElement = $this.target.closest('.limit-group-item');
    const groupBody = itemElement.closest('.limit-group-body');
    // itemElement.remove();
    groupList.value[groupIndex].conditions = groupList.value[
      groupIndex
    ].conditions.filter(item => item.id !== id);

    const tableHeader = groupBody.querySelector('.table-header');
    if (
      groupBody &&
      tableHeader &&
      groupBody.querySelectorAll('.limit-group-item').length === 0
    ) {
      // tableHeader.remove();
      tableHeader.style.display = 'none'; // sql문으로 바꿀때 맨 처음 조건식은 지워야 합니다. (ex : and - 제한조건그룹 - and - 제한조건그룹) -> (제한조건그룹 - and - 제한조건그룹)
      groupList.value[groupIndex].conditions = [];
    }
    // removeFirstBtnCase();
  });
};

// 그룹간의 조건자 셀렉트버튼 열기 이벤트
const selectedConditions = target => {
  if (target.currentTarget.closest('.conditions-btn').style.height !== '64px') {
    target.currentTarget.closest('.conditions-btn').style.height = '64px';
    target.currentTarget.querySelector('.icon').style.transform =
      'rotate(180deg)';
  } else {
    target.currentTarget.closest('.conditions-btn').style.height = '32px';
    target.currentTarget.querySelector('.icon').style.transform =
      'rotate(0deg)';
  }
};

// 그룹간의 조건자 셀렉트버튼 선택 이벤트
const choiceConditions = target => {
  const conditionsBtn = target.currentTarget.closest('.conditions-btn');
  if (conditionsBtn.style.height === '64px') {
    if (target.currentTarget.textContent.trim() === 'OR') {
      const allCondBtn = document.querySelectorAll('.conditions-btn');
      allCondBtn.forEach(target => {
        target.querySelector('.top-cond').innerHTML = 'OR <i class="icon"></i>';
        target.querySelector('.bottom-cond').innerHTML =
          'AND <i class="icon d-none"></i> ';
      });
    } else {
      const allCondBtn = document.querySelectorAll('.conditions-btn');
      allCondBtn.forEach(target => {
        target.querySelector('.bottom-cond').innerHTML =
          'OR <i class="icon d-none"></i>';
        target.querySelector('.top-cond').innerHTML =
          'AND <i class="icon"></i> ';
      });
    }
    conditionsBtn.style.height = '32px';
    conditionsBtn.querySelector('.top-cond .icon').style.transform =
      'rotate(0deg)';
  }
};

// groupList가 변경될 때마다 실행
// 로우 맨위에 조건식 붙은거 삭제하려고 만듬
watch(
  groupList,
  async () => {
    await nextTick();
    // removeFirstBtnCase();
  },
  { deep: true },
);

onMounted(() => {
  customBoxContentStyle.value = {
    border: 'none',
    'box-sizing': 'border-box',
    padding: '0',
  };

  setTimeout(() => {
    document.querySelector('.mosu-chk-btn-wrap').style.opacity = '1';
  }, 1000);

  // 추후에 데이터 AI데이터 들어올땐 지워주세요.
  // 강제로 한번 실행해서 데이터 넣어두었습니다.
  initLimitItem();
});

onBeforeUnmount(() => {
  customBoxContentStyle.value = {
    border: 'none',
    'box-sizing': 'border-box',
    padding: '0',
  };
});
// ----------- 드래그 이벤트
const onDragover = event => {
  event.currentTarget.querySelector('.limit-no-group-body').style.display =
    'none';
};
const endDrag = () => {
  document.querySelectorAll('.limit-no-group-body').forEach(target => {
    target.style.display = 'flex';
  });
};

//  드래그 끝---

const changeCondGo = ref(null);
const operationOptions = [{ value: '=' }, { value: '<' }, { value: '>' }];
// const startEditing = id => {
//   changeCondGo.value = id;
// };
const startEditing = async id => {
  changeCondGo.value = id;
  await nextTick();

  const selectElement = document.querySelector('.td-col select');
  if (selectElement) {
    selectElement.focus();
  }
};
const startTextGo = async id => {
  changeTextGo.value = id;

  await nextTick();

  const inputElement = document.querySelector('.custom-cond-input');
  if (inputElement) {
    inputElement.focus();
    inputElement.select();
  }
};

const saveOperation = (item, event) => {
  item.operation = event.target.value;
  changeCondGo.value = null;
};

const changeTextGo = ref(null);
const saveText = item => {
  console.log('저장된 값:', item.conditionValue);
  changeTextGo.value = null;
};

// 모달이벤트 시작- >>>
// 제외조건 추가 모달 모달 시작
const openViewExCondAddModal = ref(false);
const onExCondAddModal = () => {
  openViewExCondAddModal.value = true;
};
// 모달에서 선택한 데이터 콜백
const onExCondAddModalData = data => {
  if (data.length > 0) {
    data.forEach(row => {
      let addData = [];

      addData.push({
        id: row.id,
        category: '+',
        conditionName: row.marketingName,
        operation: '=',
        conditionValue: 'Y',
      });

      tableData.value.push(addData[0]);
    });
    // 생성시 스크롤 맨 아래로 이동
    setTimeout(() => {
      const box = document.querySelector('.exc-body');
      if (box) {
        box.scrollTo({
          top: box.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 0);
  }
};
// 제한조건 추가 모달 시작
const openViewLimitCondAddModal = ref(false);

const elDiv = ref(null);
const groupIndex = ref(0);

const onLimitCondAddModal = (index, element) => {
  groupIndex.value = index;

  elDiv.value = element.currentTarget
    .closest('.limit-group')
    ?.querySelector('.table-scroll');
  openViewLimitCondAddModal.value = true;
};

const onLimitCondAddModalData = (data, groupIndex, scrollElement) => {
  data.forEach(row => {
    const dataArr = {
      id: row.id || 0,
      category: '+',
      conditionName: row.marketingName,
      operation: '=',
      conditionValue: 'Y',
    };
    groupList.value[groupIndex].conditions.push(dataArr);
  });
  // 생성시 스크롤 맨 아래로 이동
  setTimeout(() => {
    if (scrollElement) {
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, 0);
};

const { step4 } = toRefs(props.modelValue);
</script>
