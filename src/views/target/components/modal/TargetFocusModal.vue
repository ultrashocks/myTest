<template>
  <div class="window-contents">
    <div class="window-header">타겟 그룹 지정</div>
    <div class="modal-body" style="padding: 16px !important">
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
