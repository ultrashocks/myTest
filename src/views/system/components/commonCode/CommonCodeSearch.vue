<template>
  <div class="input-wrap">
    <div class="input-inner gap-32">
      <div class="inner-item">
        <label>공통코드 그룹 ID</label>
        <AppInput v-model="searchData.groupId" />
      </div>
      <div class="inner-item">
        <label>공통코드 그룹명</label>
        <AppInput v-model="searchData.groupName" />
      </div>
      <div class="inner-item">
        <label>사용 여부</label>
        <AppSelectBox
          :options="useYnOptions"
          v-model:optionsSelected="searchData.useYnSelected"
          style="width: 114px"
        />
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
import { ref, toRefs } from 'vue';
import { reactive } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';

// 사용유무
const useYnOptions = reactive([
  { label: '전체', value: '전체' },
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' },
]);

const searchData = reactive({
  groupId: '',
  groupName: '',
  useYnSelected: { label: '전체', value: '전체' },
});

const emit = defineEmits(['search']);
const onSearch = () => {
  emit('search', searchData);
};
</script>
