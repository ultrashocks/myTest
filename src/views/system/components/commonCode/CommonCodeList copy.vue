<template>
  <div class="add-move__table">
    <div class="table-controls">
      <div class="table-controls__left">
        <div class="sub-title">공통코드 목록 목록</div>
        <div class="table-total">
          전체 <strong>{{ total }}</strong>
        </div>
      </div>
      <div class="table-controls__right">
        <button class="btn-common add" @click="onAddCode">추가<i></i></button
        ><button
          class="btn-common del"
          @click="onDeleteCode"
          :disabled="!hasCheckedItems"
        >
          삭제<i></i>
        </button>
      </div>
    </div>
    <div class="table-common">
      <div
        class="table-common__header"
        :class="{ 'has-scroll': hasVerticalScroll }"
      >
        <table>
          <colgroup>
            <col width="45" />
            <col width="15%" />
            <col width="15%" />
            <col width="" />
            <col width="200" />
            <col width="150" />
          </colgroup>
          <thead>
            <tr>
              <th>선택</th>
              <th>공통코드</th>
              <th>공통코드명</th>
              <th>공통코드 설명(선택)</th>
              <th>사용 유무</th>
              <th>순서조정</th>
            </tr>
          </thead>
        </table>
      </div>
      <div
        class="table-common__body"
        style="height: 132px"
        ref="scrollContainer"
      >
        <table>
          <colgroup>
            <col width="45" />
            <col width="15%" />
            <col width="15%" />
            <col width="" />
            <col width="200" />
            <col width="150" />
          </colgroup>
          <tbody>
            <tr
              v-for="(item, rowIndex) in tableData"
              :key="item.id"
              :class="{
                checked: item.checked,
                add: rowIndex === 0 && currentState === 'add',
              }"
              @click="onSelectRow(item.id)"
            >
              <td>
                <div class="custom-checkbox">
                  <label @click.stop>
                    <input type="checkbox" v-model="item.checked" />
                    <i class="icon"></i>
                  </label>
                </div>
              </td>
              <td>
                <div class="td-col">
                  <div
                    class="td-col__text"
                    v-if="
                      editingRow !== item.id || editingField !== 'commonCodeId'
                    "
                    @dblclick="startEditing(item.id, 'commonCodeId')"
                  >
                    {{ item.commonCodeId }}
                  </div>
                  <input
                    v-else
                    v-model="item.commonCodeId"
                    @blur="saveEdit(item)"
                    @keydown.enter="saveEdit(item)"
                    :ref="el => setEditInputRef(el, item.id, 'commonCodeId')"
                    class="edit-input"
                  />
                </div>
              </td>
              <td>
                <div class="td-col">
                  <div
                    class="td-col__text"
                    v-if="
                      editingRow !== item.id ||
                      editingField !== 'commonCodeName'
                    "
                    @dblclick="startEditing(item.id, 'commonCodeName')"
                  >
                    {{ item.commonCodeName }}
                  </div>
                  <input
                    v-else
                    v-model="item.commonCodeName"
                    @blur="saveEdit(item)"
                    @keydown.enter="saveEdit(item)"
                    :ref="el => setEditInputRef(el, item.id, 'commonCodeName')"
                    class="edit-input"
                  />
                </div>
              </td>
              <td>
                <div class="td-col">
                  <div
                    class="td-col__text"
                    v-if="editingRow !== item.id || editingField !== 'explain'"
                    @dblclick="startEditing(item.id, 'explain')"
                  >
                    {{ item.explain }}
                  </div>
                  <input
                    v-else
                    v-model="item.explain"
                    @blur="saveEdit(item)"
                    @keydown.enter="saveEdit(item)"
                    :ref="el => setEditInputRef(el, item.id, 'explain')"
                    class="edit-input"
                  />
                </div>
              </td>
              <td>
                <div class="custom-radio-group">
                  <div
                    class="custom-radio"
                    v-for="(check, index) in checkedUseYn"
                    :key="index"
                  >
                    <label>
                      <input
                        type="radio"
                        :name="`useYn${item.id}`"
                        v-model="item.useYn"
                        :value="check.value"
                      />
                      <i class="icon"></i>
                      <span>{{ check.name }}</span>
                    </label>
                  </div>
                </div>
              </td>
              <td>
                <div class="order-control">
                  <button class="btn-common up" @click="onMoveUp(item.id)">
                    <i class="icon"></i>
                  </button>
                  <button class="btn-common down" @click="onMoveDown(item.id)">
                    <i class="icon"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 조회 결과가 없는경우에 보이게 처리 -->
        <div class="non-table__data" v-if="tableData.length < 1">
          <div class="msg-box">
            <i class="icon"></i>
            <div class="msg">데이터가 없습니다.</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Confrim창 -->
    <AppDialog
      v-model:view="deleteConfirmState.view"
      :title="deleteConfirmState.title"
      :message="deleteConfirmState.message"
      @confirm="onConfrim"
    />
  </div>
</template>

<script setup>
import AppDialog from '@/components/ui/AppDialog.vue';
import { ref, nextTick, onMounted, computed } from 'vue';
import { randomKey } from '@/utils/utils';
import { useScrollChecker } from '@/composables/useScrollChecker';
import { reactive } from 'vue';
import { useAlert } from '@/composables/alert';
import { useSlider } from '@/composables/slider';

const { setAlertStatus } = useAlert();
const { setSliderStatus } = useSlider();

// 스크롤 유무 체크
const scrollContainer = ref(null);
const { hasVerticalScroll, checkScroll } = useScrollChecker(scrollContainer);

const currentState = ref('');

//사용 여부
const checkedUseYn = ref([
  { name: '사용', value: 'Y' },
  { name: '미사용', value: 'N' },
]);

const tableData = ref([]);
const total = ref(0);
const attachData = async () => {
  for (let i = 0; i < 2; i++) {
    tableData.value.push({
      id: randomKey(),
      checked: false,
      commonCodeId: `LZP000${i}`,
      commonCodeName: '모비일',
      explain: '서비스 중 모바일',
      useYn: Math.random() < 0.5 ? 'Y' : 'N',
    });
  }
  total.value = tableData.value.length;
  await nextTick();
  checkScroll();
};

const onAddCode = () => {
  currentState.value = 'add';
  selectRowId.value = '';
  tableData.value.unshift({
    id: randomKey(),
    checked: false,
    commonCodeId: ``,
    commonCodeName: '',
    explain: '',
    useYn: 'Y',
  });
};

const onDeleteCode = () => {
  if (tableData.value.some(file => file.checked)) {
    deleteConfirmState.view = true;
  }
  //  else {
  //   setAlertStatus({
  //     view: true,
  //     message: '삭제할 항목을 한개 이상 체크해주세요.',
  //   });
  // }
};

// Confrim창
const deleteConfirmState = reactive({
  view: false,
  message: `메뉴를 삭제하시겠습니까?`,
});
const onConfrim = () => {
  // if (currentState.value === 'add' && tableData.value[0]?.checked) {
  //   currentState.value = '';
  // }
  currentState.value = '';
  tableData.value = tableData.value.filter(file => !file.checked);
  setSliderStatus({
    view: true,
    message: '메뉴가 삭제되었습니다.',
  });
};

const selectRowId = ref('');
const onSelectRow = id => {
  selectRowId.value = id;
};

const onMoveUp = id => {
  console.log('위로 이동');
  const index = tableData.value.findIndex(item => item.id === id);
  if (index > 0) {
    const temp = tableData.value[index - 1];
    tableData.value[index - 1] = tableData.value[index];
    tableData.value[index] = temp;
  }
};

const onMoveDown = id => {
  console.log('아래로 이동');
  const index = tableData.value.findIndex(item => item.id === id);
  if (index < tableData.value.length - 1) {
    const temp = tableData.value[index + 1];
    tableData.value[index + 1] = tableData.value[index];
    tableData.value[index] = temp;
  }
};

const editingRow = ref(null);
const editingField = ref('');
const editInputRefs = ref({});

const setEditInputRef = (el, id, field) => {
  if (el) {
    editInputRefs.value[`${id}-${field}`] = el;
  }
};

const startEditing = (id, field) => {
  editingRow.value = id;
  editingField.value = field;
  nextTick(() => {
    const inputRef = editInputRefs.value[`${id}-${field}`];
    if (inputRef) {
      inputRef.focus();
      const length = inputRef.value.length;
      inputRef.setSelectionRange(length, length);
    }
  });
};

const saveEdit = item => {
  editingRow.value = null;
  editingField.value = '';
};

const blankDataCheck = () => {
  const blankData = tableData.value.filter(
    item => !item.commonCodeId || !item.commonCodeName || !item.explain,
  );
  if (blankData.length > 0) {
    return true;
  } else {
    // 업데이트
    total.value = tableData.value.length;
    currentState.value = '';
  }
};

const hasCheckedItems = computed(() => {
  return tableData.value.some(item => item.checked);
});

defineExpose({
  blankDataCheck,
});

onMounted(() => {
  attachData();
});
</script>
