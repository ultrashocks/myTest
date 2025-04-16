<template>
  <div class="table-container" style="max-height: 378px">
    <table class="table">
      <colgroup>
        <col width="10%" />
        <col width="" />
        <col width="20%" />
      </colgroup>
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td class="td-center">
            {{ data.length - rowIndex }}
          </td>

          <td class="td-left">
            <router-link :to="`/business/menu2/${rowIndex}`" class="nav-link">
              <div class="icons">
                <span v-if="row.importantYn" class="important">중요</span>
                <span class="font-secondary"> {{ row.boardName }} </span>
                <span v-if="row.securityYn" class="icon-inline lock"
                  >비노출</span
                ><span v-if="row.fileYn" class="icon-inline attach"
                  >첨부파일</span
                ><span v-if="row.newYn" class="new">N</span>
              </div>
            </router-link>
          </td>

          <td class="td-center">
            {{ row.boardInputDate }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';

let currentPage = ref(1);
const textElements = ref({});
const isOverflow = ref({});

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

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  showCheckbox: {
    type: Boolean,
    default: true,
  },
});

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
</script>

<style scoped></style>
