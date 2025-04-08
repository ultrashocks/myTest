<template>
  <div class="window-contents">
    <div class="window-header">타겟 그룹 관리</div>
    <div class="modal-body">
      <div class="target-top-input-wrap">
        <div
          class="input-inner"
          style="width: 100%; justify-content: space-between"
        >
          <div class="inner-item">
            <div>그룹명</div>
            <AppSelectCode
              style="width: 350px"
              v-model="selectCode"
              @search="onSearch"
              placeholder="그룹명 입력"
            />
          </div>
          <div class="inner-item">
            <button class="btn-search"><i class="icon"></i>조회</button>
          </div>
        </div>
      </div>
      <div class="info-box">
        <div>전체 {{ cnt }}</div>
        <div>
          <button class="btn-common add" @click="addRow">추가<i></i></button>
          <button class="btn-common del" @click="deleteSelected">
            삭제<i></i>
          </button>
        </div>
      </div>
      <div class="table-row">
        <div class="table-scroll" ref="tooltipContainer">
          <div class="table-header">
            <table>
              <thead>
                <tr>
                  <th>
                    <div class="td-col radio">
                      <div class="custom-checkbox" style="margin-left: 14.5px">
                        <label>
                          <input
                            type="checkbox"
                            v-model="selectAll"
                            @change="toggleSelectAll"
                          />
                          <i class="icon"></i>
                        </label>
                      </div>
                    </div>
                  </th>
                  <th colspan="10">타겟 그룹명</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="table-body">
            <table>
              <colgroup>
                <col width="5.4%" />
                <col width="50%" />
                <col width="5%" />
                <col width="6%" />
              </colgroup>
              <tbody>
                <tr
                  v-for="item in tableData"
                  :key="item.id"
                  :class="{ active: selectedRows.includes(item.id) }"
                  @dblclick="changeInputRow(item)"
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
                  <td
                    class="td-left"
                    :class="{ 'target-row': editingRow === item.id }"
                  >
                    <div class="td-col">
                      <input
                        v-if="editingRow === item.id"
                        v-model="item.marketingName"
                        @blur="saveEdit(item)"
                        @keydown.enter="saveEdit(item)"
                        ref="editInput"
                      />
                      <span v-else>{{ item.marketingName }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="flex-center-center">
                      <button
                        @click="moveUp(item)"
                        :disabled="tableData[0].id === item.id"
                      >
                        <i class="icon down_arrow"></i>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div class="flex-center-center">
                      <button
                        @click="moveDown(item)"
                        :disabled="
                          tableData[tableData.length - 1].id === item.id
                        "
                      >
                        <i class="icon up_arrow"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- 조회 결과가 없는 경우에 보이게 처리 -->
            <!-- <div class="non-table__data">
              <div class="msg-box">
                <i class="icon"></i>
                <div class="msg">
                  등록된 타겟 그룹이 없습니다.<br />그룹을 등록해 주세요.
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="footer-noti">
      <button>
        <i class="icon circle_info"></i>
      </button>
      <span style="font-size: 12px"
        >타겟 그룹을 삭제하시면, 그룹에 속해 있는 타겟은 ‘미지정’ 상태가 됩니다.
        [저장]을 누르셔야 변경 사항이 저장됩니다.</span
      >
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button class="btn-s red" @click="onConfirm">적용</button>
    </div>
  </div>
</template>

<script setup>
import AppSelectCode from '@/components/ui/AppSelectCode.vue';
import { ref, watch, nextTick } from 'vue';

const emit = defineEmits(['cancel', 'confirm']);
const onCancel = () => emit('cancel');
const onConfirm = () => emit('confirm');

const selectCode = ref('');

const tableData = ref([]);
const cnt = ref(30);
const selectedRows = ref([]);
const selectAll = ref(false); //

// 더미 데이터 생성
const attachData = () => {
  let testData = [];
  for (let i = 0; i < 30; i++) {
    testData.push({
      id: i,
      // activity: 'up-sell',
      // service: '모바일',
      // marketingCode: `MK${i.toString().padStart(3, '0')}`,
      marketingName: `모바일 요금제 x VAS 업셀 - ${i}`,
    });
  }
  tableData.value = testData;
};
attachData();

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedRows.value = tableData.value.map(item => item.id);
  } else {
    selectedRows.value = [];
  }
};

const updateSelectAll = () => {
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

// 행 더블 클릭시 인풋으로 수정
const editingRow = ref(null);
const editInput = ref(null);

const changeInputRow = item => {
  editingRow.value = item.id;
  nextTick(() => {
    if (editInput.value) {
      editInput.value.focus();
    }
  });
};

const saveEdit = item => {
  editingRow.value = null;
};

const addRow = () => {
  const newId = tableData.value.length;
  tableData.value.unshift({
    id: newId,
    marketingName: ``,
  });
  cnt.value = tableData.value.length;
};

const deleteSelected = () => {
  tableData.value = tableData.value.filter(
    item => !selectedRows.value.includes(item.id),
  );
  selectedRows.value = [];
  selectAll.value = false;
  cnt.value = tableData.value.length;
};

const moveUp = item => {
  const index = tableData.value.findIndex(row => row.id === item.id);
  if (index > 0) {
    [tableData.value[index], tableData.value[index - 1]] = [
      tableData.value[index - 1],
      tableData.value[index],
    ];
  }
};

const moveDown = item => {
  const index = tableData.value.findIndex(row => row.id === item.id);
  if (index < tableData.value.length - 1) {
    [tableData.value[index], tableData.value[index + 1]] = [
      tableData.value[index + 1],
      tableData.value[index],
    ];
  }
};

watch(tableData, () => {
  updateSelectAll();
});
</script>
