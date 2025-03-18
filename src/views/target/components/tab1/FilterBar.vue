<template>
  <div class="filter-container">
    <div class="d-flex align-item">
      <div class="inner-item">
        <AppSelectBox
          :options="selectOptions"
          v-model:optionsSelected="optionsSelected"
          style="width: 73px"
        />
      </div>
      <div class="divider"></div>
      <div class="inner-item">
        <div class="button-group">
          <button
            v-for="(button, index) in buttons"
            :key="index"
            class="btn-filter"
            :class="{ selected: selectedButton === index }"
            @click="selectedButton = index"
          >
            {{ button.label }}
            <span class="cnt">{{ button.count }}</span>
          </button>
        </div>
      </div>
      <div class="divider"></div>
      <div class="btn-filter">
        <button>
          <i class=""></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import { reactive } from 'vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import AppSelectCode from '@/components/ui/AppSelectCode.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const buttons = ref([
  { label: '전체', count: 5 },
  { label: '작성중', count: 3 },
  { label: '실행대기', count: 8 },
  { label: '실행중', count: 2 },
  { label: '중지', count: 4 },
  { label: '종료', count: 6 },
  { label: '오류', count: 1 },
]);

const selectedButton = ref(null);

// 셀렉트박스
const selectOptions = reactive([
  { label: '15', value: 15 },
  { label: '30', value: 30 },
  { label: '50', value: 50 },
]);
const optionsSelected = ref({ label: '15', value: 15 });

// 인풋태그
const selectCode = ref('전체');
const onSearch = () => {
  selectCode.value = '전체 눌림';
};
</script>
