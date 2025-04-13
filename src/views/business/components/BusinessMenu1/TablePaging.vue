<template>
  <div class="pagination-container">
    <button @click="firstPage" :disabled="currentPage === 1">&lt;&lt;</button>

    <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>

    <span
      v-for="page in pageNumbers"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="gotoPage(page)"
    >
      {{ page }}
    </span>

    <button @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>

    <button @click="lastPage" :disabled="currentPage === totalPages">&gt;&gt;</button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  max: { type: Number, required: true },
  current: { type: Number, required: true },
  perPage: { type: Number, default: 10 },
});

const currentPage = computed(() => props.current);

watch(
  () => currentPage.value,
  (newPage, oldPage) => {},
  { immediate: true },
);

const emit = defineEmits(['update:current']);

// 전체 페이지 수 계산
const totalPages = computed(() => Math.ceil(props.max / props.perPage));

// 표시할 페이지 번호 생성
// const pageNumbers = computed(() => {
//   const startPage = Math.max(1, props.current - 5);
//   const endPage = Math.min(totalPages.value, props.current + 5);
//   let pages = [];
//   console.log(startPage + ' ' + endPage);
//   for (let i = startPage; i <= endPage; i++) {
//     pages.push(i);
//   }
//   return pages;
// });
const pageNumbers = computed(() => {
  const total = totalPages.value;
  const current = props.current;
  const maxVisible = 10;

  let startPage = Math.floor((current - 1) / maxVisible) * maxVisible + 1;
  let endPage = Math.min(startPage + maxVisible - 1, total);

  let pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const firstPage = () => {
  emit('update:current', 1);
};

const prevPage = () => {
  if (props.current > 1) {
    emit('update:current', props.current - 1);
  }
};

const nextPage = () => {
  if (props.current < totalPages.value) {
    emit('update:current', props.current + 1);
  }
};

const lastPage = () => {
  emit('update:current', totalPages.value);
};

const gotoPage = page => {
  emit('update:current', page);
};
</script>

<style scoped></style>
