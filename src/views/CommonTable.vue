<template>
  <div class="table-container">
    <table class="table">
      <colgroup>
        <col width="38px" />
        <col width="79px" />
        <col width="16.2637%" />
        <col width="14.4322%" />
        <col width="95px" />
        <col width="66px" />
        <col width="10%" />
        <col width="89px" />
        <col width="75px" />
        <col width="94px" />
        <col width="93px" />
        <col width="62px" />
        <col width="75px" />
        <col width="89px" />
      </colgroup>
      <thead>
        <tr>
          <!-- 체크박스 열을 조건부로 렌더링 -->
          <th
            v-if="showCheckbox || false"
            :style="{ textAlign: 'center', padding: '7px 8px' }"
          >
            <div class="td-col radio">
              <div class="custom-checkbox">
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
          <th v-for="header in headers" :key="header.key">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          :class="{ 'selected-row': selectedRows[rowIndex] }"
        >
          <td v-if="showCheckbox || false" :style="{ textAlign: 'center' }">
            <div class="td-col radio">
              <div class="custom-checkbox">
                <label>
                  <input
                    type="checkbox"
                    v-model="selectedRows[rowIndex]"
                    @change="updateSelectedRows"
                  />
                  <i class="icon"></i>
                </label>
              </div>
            </div>
          </td>
          <td
            v-for="(header, cellIndex) in headers"
            :key="cellIndex"
            :style="
              row[header.key].align ? { textAlign: row[header.key].align } : {}
            "
          >
            <template v-if="row[header.key]">
              <!-- 버튼인 경우 -->
              <button
                v-if="row[header.key].type === 'button'"
                @click="handleButtonClick(row[header.key].action)"
              >
                {{ row[header.key].label }}
              </button>

              <!-- 링크인 경우 -->
              <a
                v-else-if="row[header.key].type === 'link'"
                :href="row[header.key].url"
                target="_blank"
                :ref="el => setTextElement(el, rowIndex, header.key)"
                :title="
                  isOverflow[rowIndex]?.[header.key]
                    ? row[header.key].label
                    : ''
                "
              >
                {{ row[header.key].label }}
              </a>
              <!-- 기본 텍스트 정렬이 들어갈 경우 -->
              <span
                v-else-if="row[header.key].type === 'text'"
                :ref="el => setTextElement(el, rowIndex, header.key)"
                :title="
                  isOverflow[rowIndex]?.[header.key]
                    ? row[header.key].label
                    : ''
                "
              >
                {{ row[header.key].label }}
              </span>

              <!-- 기본 텍스트 -->
              <span
                v-else
                :ref="el => setTextElement(el, rowIndex, header.key)"
                :title="
                  isOverflow[rowIndex]?.[header.key] ? row[header.key] : ''
                "
              >
                {{ row[header.key] }}
              </span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <TablePaging
      :max="249"
      :current="currentPage"
      :perPage="15"
      @update:current="updateCurrentPage"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import TablePaging from '@/views/TablePaging.vue';

let currentPage = ref(1);
const textElements = ref({});
const isOverflow = ref({});

const setTextElement = (el, rowIndex, headerKey) => {
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
  nextTick(() => {
    checkOverflow();
  });
});

const updateCurrentPage = page => {
  currentPage.value = page;
};

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  showCheckbox: {
    type: Boolean,
    default: true,
  },
});

const selectAll = ref(false);
const selectedRows = ref([]);

watch(
  () => props.data,
  () => {
    selectedRows.value = Array(props.data.length).fill(false);
  },
  { immediate: true },
);

watch(
  () => currentPage.value,
  (newPage, oldPage) => {
    console.log(`currentPage 변경됨: ${oldPage} -> ${newPage}`);
    /*페이지변경 감지 될떄 다시한번 목록 조회 api호출 하면 됩니다!!*/
  },
  { immediate: true },
);

const toggleSelectAll = () => {
  selectedRows.value = selectAll.value
    ? Array(props.data.length).fill(true)
    : Array(props.data.length).fill(false);
};

const updateSelectedRows = () => {
  selectAll.value = selectedRows.value.every(row => row);
};

// 가지고온 버튼 클릭 이벤트
const handleButtonClick = action => {
  if (typeof action === 'function') {
    action();
  }
};
</script>

<style scoped></style>
