<template>
  <div class="table-controls">
    <div class="table-controls__left">
      <div class="sub-title">CMS 마케팅활동 조회</div>
    </div>
    <div class="table-controls__right"></div>
  </div>

  <div class="input-wrap marketing-cms">
    <div class="input-inner">
      <div class="inner-item">
        <AppSelectBox
          :options="selectOptions"
          v-model:optionsSelected="searchData.selected"
          style="width: 100%"
        />
      </div>
      <div class="inner-item">
        <AppInput v-model="searchData.marketingName" style="width: 100%" />
      </div>
      <div class="inner-item btn-search-box">
        <button class="btn-search" @click="onSearch">
          <i class="icon"></i>조회
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';

// 사용유무
const selectOptions = reactive([
  { label: '마케팅 활동명', value: 1 },
  { label: '마케팅 활동명2', value: 2 },
]);

const searchData = reactive({
  selected: { label: '마케팅 활동명', value: 1 },
  marketingName: '',
});

const onSearch = () => {
  // emit('search', searchData);
};
</script>
