<template>
  <div class="input-wrap">
    <div class="input-inner">
      <div class="inner-item">
        <AppSelectBox
          :options="selectOptions"
          v-model:optionsSelected="optionsSelected"
          style="width: 114px"
        />
      </div>
      <div class="inner-item">
        <AppSelectCode
          style="width: 350px"
          v-model="selectCode"
          @search="onSearch"
          placeholder="조회"
        />
      </div>
      <div class="inner-item">
        <button class="btn-search"><i class="icon"></i>조회</button>
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

// 셀렉트박스
const selectOptions = reactive([
  { label: '전체', value: 0 },
  { label: '아이템1', value: 1 },
  { label: '아이템2', value: 2 },
]);
const optionsSelected = ref({ label: '전체', value: 0 });

// 인풋태그
const selectCode = ref('');
</script>
