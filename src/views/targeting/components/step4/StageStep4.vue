<template>
  <StepStage :style="customBoxContentStyle">
    <ul class="targeting-detail-condition-wrap">
      <div class="mosu-loading-page">
        <ul class="mosu-loading-wrap" style="width: 480px; height: 100%;">
          <li>
            박스 이미지
          </li>
          <li>
            <span>모수 체크 중이예요.</span> 잠시만 기다려 주세요.
          </li>
          <li>
            조건에 따른 모수 체크까지 시간이 소요될 수 있습니다.
          </li>
          <li class="md-line">
            요상한 선---
          </li>
          <li class="noti">
            <i class="icon"></i>[나중에 확인하기] 버튼을 누르시면 현재 상태로 임시 저장되며 목록으로 이동됩니다.
          </li>
          <li class="noti">
            <i class="icon"></i>타겟 추출이 완료되면, 메일과 문자로 알림이 전송됩니다.
          </li>
          <li class="나중에 확인하기">나중에 확인하기</li>
        </ul>
      </div>
      <li class="mosu-chk-btn-wrap">
        <div class="mosu-chk-btn" @click="moduChk()">모수 체크</div>
        <div class="mosu-chk-btn-noti"><i class="icon"></i>타겟 추전 전에 “모수 체크”는 필수 확인 사항입니다.</div>
      </li>
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
              >
                <div
                  v-for="(item, index) in group.conditions"
                  :key="groupIndex + '' + index + '' + Date.now()"
                  class="limit-group-item"
                >
                  <div class="table-body">
                    <div
                      class="d-flex justify-center align-center btn-case"
                      style="
                        height: 36px;
                        font-weight: 500;
                        background-color: rgb(255, 255, 255);
                      "
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
                              <span title="">{{ item.category }}</span>
                            </div>
                          </td>
                          <td style="text-align: start">
                            <div class="td-col">
                              <span v-bind:title="item.conditionName">
                                {{ item.conditionName }}
                              </span>
                            </div>
                          </td>
                          <td style="text-align: center">
                            <div class="td-col">
                              <span v-bind:title="item.operation">{{
                                item.operation
                              }}</span>
                            </div>
                          </td>
                          <td style="text-align: center">
                            <div class="td-col">
                              <span v-bind:title="item.conditionValue">Y</span>
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
const tableData02 = ref([]);
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
  removeFirstBtnCase();
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
    });
  }
  tableData.value = testData;
};
attachData();

let customBoxContentStyle = ref({});

// 모달에서 데이터를 이함수에 내려주면 됨 모달은 어떤 그룹의 제한조건인지 groupIndex만 들고 올라가면됨
const addLimitItem = groupIndex => {
  const testData = {
    id: groupIndex + '' + Date.now() || 0,
    category: '+',
    conditionName: `${
      groupIndex + '' + Date.now() || 0
    } - [고객ID]상담 거부 이력(최근 3개월)`,
    operation: '=',
    conditionValue: 'Y',
  };
  groupList.value[groupIndex].conditions.push(testData);
};

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
      console.log(btnCase);
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

// 그룹 삭제
const deleteGroup = groupIndex => {
  groupList.value.splice(groupIndex, 1);
};

// 그룹의 제한조건 추가 삭제 될떄 감지 요소를 삭제하는 함수
const removeFirstBtnCase = () => {
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
      tableHeader.style.display = 'none'; // 숨기게 되면 나중에 sql문으로 바꿀때 맨 처음 조건식은 지워야 합니다.
      groupList.value[groupIndex].conditions = [];
    }
    removeFirstBtnCase();
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
      allCondBtn.forEach( target => {
        target.querySelector('.top-cond').innerHTML = 'OR <i class="icon"></i>';
        target.querySelector('.bottom-cond').innerHTML = 'AND <i class="icon d-none"></i> ';
      })
    } else {
      const allCondBtn = document.querySelectorAll('.conditions-btn');
      allCondBtn.forEach( target => {
        target.querySelector('.bottom-cond').innerHTML = 'OR <i class="icon d-none"></i>';
        target.querySelector('.top-cond').innerHTML = 'AND <i class="icon"></i> ';
      })
    }
    conditionsBtn.style.height = '32px';
    conditionsBtn.querySelector('.top-cond .icon').style.transform = 'rotate(0deg)';
  }
};

// 모수 체크 버튼
const moduChk = () => {
  document.querySelector('.mosu-chk-btn-wrap').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.mosu-chk-btn-wrap').style.display = 'none';
  }, 400);

  const loadingPage = document.querySelector('.mosu-loading-page');

  if (loadingPage) {
    loadingPage.style.display = 'flex';
    loadingPage.style.opacity = '1';
    loadingPage.style.transition = 'opacity 0.4s ease';

    setTimeout(() => {
      loadingPage.style.opacity = '0';

      setTimeout(() => {
        loadingPage.style.display = 'none';
      }, 400);
    }, 2000);
  }
};

// groupList가 변경될 때마다 실행
// 로우 맨위에 조건식 붙은거 삭제하려고 만듬
watch(
  groupList,
  async () => {
    await nextTick();
    removeFirstBtnCase();
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

const { step4 } = toRefs(props.modelValue);
</script>
