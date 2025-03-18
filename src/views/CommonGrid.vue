<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <!-- 체크박스 열을 조건부로 렌더링 -->
          <th v-if="showCheckbox || false">
            <input
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelectAll"
            />
          </th>
          <th v-for="header in headers" :key="header.key">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <!-- 체크박스 셀을 조건부로 렌더링 -->
          <td v-if="showCheckbox || false" :style="{ textAlign: 'center' }">
            <input
              type="checkbox"
              v-model="selectedRows[rowIndex]"
              @change="updateSelectedRows"
            />
          </td>
          <td
            v-for="(header, cellIndex) in headers"
            :key="cellIndex"
            :style="{
              textAlign: (row[header.key] && row[header.key].align) || 'left',
            }"
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
              >
                {{ row[header.key].label }}
              </a>

              <!-- 체널상세 분기 잡음 -->
              <template v-else-if="header.key === 'channel_detail'">
                <span style="padding: 0 8px; text-align: left; flex: 1">
                  {{ row.channel_detail || ' ' }}
                </span>
                <span
                  style="padding: 0 8px; text-align: center; color: #999999"
                >
                  |
                </span>
                <span style="padding: 0 8px; text-align: right; flex: 1">
                  {{ row.channel_detail02 || ' ' }}
                </span>
              </template>

              <!-- 기본 텍스트 -->
              <span v-else>{{ row[header.key] }}</span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

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

const toggleSelectAll = () => {
  selectedRows.value = selectAll.value
    ? Array(props.data.length).fill(true)
    : Array(props.data.length).fill(false);
};

const updateSelectedRows = () => {
  selectAll.value = selectedRows.value.every(row => row);
};

const handleButtonClick = action => {
  console.log('버튼 클릭:', action);
};
</script>

<style scoped></style>
