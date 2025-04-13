<template>
  <div class="window-contents">
    <div class="window-header">
      공유 대상 선택
      <button
        class="btn-info"
        v-tippy="{
          content: 'TA 사이트 권한이 마당 사용자만 조회됩니다.',
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
        <!-- 목록에서 선택 탭 -->
        <div>
          <div class="search-row">
            <div class="search-box">
              <div class="search-col">
                <div>이름/부서</div>
                <div>
                  <input
                    type="text"
                    width="150px"
                    v-model="selectCode"
                    placeholder="이름/부서"
                  />
                </div>
              </div>
              <button class="btn-search" @click="onSearch"><i class="icon"></i>조회</button>
            </div>
          </div>
          <div class="share-target-choice-wrap">
            <div class="all-user-wrap">
              <ul class="title-row">
                <li>
                  전체<span class="">({{ selectCnt }})</span>
                </li>
                <li>
                  <button class="btn-common" @click="toggleSelectAll">
                    전체선택
                  </button>
                </li>
              </ul>
              <div class="table-row">
                <div class="table-scroll non-header">
                  <div class="table-body">
                    <table>
                      <colgroup>
                        <col width="100%" />
                      </colgroup>
                      <tbody>
                        <tr
                          v-for="(item, rowIndex) in filteredSegGroup"
                          :key="item.id"
                          :class="{ active: selectedRows.includes(item.id) }"
                          @click="onSelectRow(item)"
                          @mouseover="checkEllipsis($event, rowIndex)"
                        >
                          <td class="d-none">
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
                          <td class="td-left">
                            <div
                              class="td-col"
                              :title="isEll[rowIndex] ? item.userName : ''"
                            >
                              {{ item.userName }}({{ item.userId }})/{{ item.teamName }}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="choice-user-wrap">
              <ul class="title-row">
                <li>
                  선택<span class="">({{ selectedRowsData.length }}/20)</span>
                </li>
                <li>
                  <button class="btn-common" @click="removeChoiceBox">
                    전체삭제
                  </button>
                </li>
              </ul>
              <div class="table-row">
                <div class="table-scroll non-header">
                  <div class="table-body">
                    <table>
                      <colgroup>
                        <col width="100%" />
                      </colgroup>
                      <tbody>
                        <tr
                          v-for="(item, rowIndex) in selectedRowsData"
                          :key="item.id"
                          class="active"
                        >
                          <td class="td-left">
                            <div
                              class="td-col d-flex justify-between align-center"
                              :title="isEll[rowIndex] ? item.userName : ''"
                            >
                              {{ item.userName }}({{ item.userId }})/{{
                                item.teamName
                              }}
                              <span
                                class="btn-common-del"
                                @click="removeRow($event)"
                              >
                                <i class="icon"></i>
                              </span>
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
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button
        class="btn-s red"
        @click="onConfirmTab01"
        :disabled="Object.keys(selectedRowsData).length < 1"
      >
        공유
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { directive as vTippy } from 'vue-tippy';

/**
 * 테이블
 */
const segGroup = ref([]);

//데이터를 불러 왔다는 가정하에 작업
const rdoList01 = () => {
  //axios 호출
  segGroup.value = [
    {
      id: 10,
      userName: '김팀장',
      userId: 'kimmanager',
      teamName: 'CVM/제휴플랫폼팀',
    },
    {
      id: 11,
      userName: '권부장',
      userId: '마당ID',
      teamName: 'CVM/제휴플랫폼팀',
    },
    {
      id: 12,
      userName: '박부장',
      userId: '마당ID',
      teamName: 'CVM/제휴플랫폼팀',
    },
    { id: 13, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 14, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 15, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 16, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 17, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 18, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 19, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 20, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 21, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 22, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 23, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 105, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 106, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 107, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 108, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 109, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 200, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 201, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 202, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
    { id: 203, userName: '이름', userId: '마당ID', teamName: '소속팀명' },
  ];
};
rdoList01();

const emit = defineEmits(['cancel', 'callBeck']);
const onCancel = () => {
  emit('cancel');
};

const isEll = ref([]);

// 타이틀 나오게
const checkEllipsis = (event, index) => {
  const el = event.target;
  if (el.scrollWidth > el.clientWidth) {
    isEll.value[index] = true;
  } else {
    isEll.value[index] = false;
  }
};

const onConfirmTab01 = () => {
  const selectData = {
    group: selectedRowsData.value,
    // detailData: segDetailRowData.value,
  };

  // 선택된로우 선택 이후 was로 바로 보낼지 말지 선택
  console.log(selectData.group);

  emit('callBeck', selectData);
  emit('cancel');
};

// 체크박스 이벤트
const selectedRows = ref([]);
const selectCnt = ref(0);
const sqlText = ref('');
const isTextEntered = ref(false);
// 인풋태그
const selectCode = ref('');
const searchText = ref('');

//체크박스
const selectAll = ref(false);
const selectedRowsData = ref([]);
const toggleSelectAll = () => {
  selectAll.value = !selectAll.value;

  if (selectAll.value) {
    selectedRows.value = segGroup.value.map(item => item.id);
    selectedRowsData.value = [...segGroup.value];
  } else {
    selectedRows.value = [];
    selectedRowsData.value = [];
  }
};
const onSelectRow = item => {
  const index = selectedRows.value.indexOf(item.id);
  const dataIndex = selectedRowsData.value.findIndex(row => row.id === item.id);
  if (index === -1) {
    selectedRows.value.push(item.id);
    selectedRowsData.value.push({ ...item });
  } else {
    selectedRows.value.splice(index, 1);
    selectedRowsData.value.splice(dataIndex, 1);
  }

  updateSelectAll();
};
const updateSelectAll = () => {
  selectAll.value = selectedRows.value.length === segGroup.value.length;
};

const removeChoiceBox = () => {
  selectedRows.value = [];
  selectedRowsData.value = [];
};

const removeRow = item => {
  const index = selectedRows.value.indexOf(item.id);
  const dataIndex = selectedRowsData.value.findIndex(row => row.id === item.id);

  selectedRows.value.splice(index, 1);
  selectedRowsData.value.splice(dataIndex, 1);

  updateSelectAll();
};

watchEffect(() => {
  selectCnt.value = selectedRows.value.length;
  isTextEntered.value = sqlText.value.trim().length > 0;
});

watch(
  selectedRowsData,
  newVal => {
    if (newVal.length > 20) {
      selectedRowsData.value = newVal.slice(0, 20);
      selectedRows.value = selectedRowsData.value.map(item => item.id);
      setTimeout(() => {
        alert('최대 20개까지만 선택할 수 있어요!');
      }, 0);
    }
  },
  { deep: true },
);

const filteredSegGroup = computed(() =>
  segGroup.value.filter(
    item =>
      item.userName?.includes(searchText.value) ||
      item.userId?.includes(searchText.value) ||
      item.teamName?.includes(searchText.value),
  ),
);

const onSearch = () => {
  searchText.value = selectCode.value;
};
</script>
