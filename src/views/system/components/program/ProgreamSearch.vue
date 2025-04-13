<template>
  <div class="input-wrap grid-4">
    <div class="input-inner">
      <div class="inner-item">
        <label style="flex: 0 0 70px">프로그램 ID</label>
        <AppInput v-model="searchData.programId" />
      </div>
      <div class="inner-item">
        <label>메뉴명</label>
        <AppInput v-model="searchData.menuName" />
      </div>
      <div class="inner-item">
        <label>사용 여부</label>
        <AppSelectBox
          :options="useYnOptions"
          v-model:optionsSelected="searchData.useYnSelected"
          style="width: 114px"
        />
      </div>
      <div class="inner-item"></div>
      <div class="inner-item">
        <label style="flex: 0 0 70px">메뉴 모듈명</label>
        <AppInput v-model="searchData.menuModuleName" />
      </div>
      <div class="inner-item">
        <label>상위메뉴 ID</label>
        <AppInput v-model="searchData.upperMenuId" />
      </div>
      <div class="inner-item">
        <label>권한</label>
        <AppSelectBox
          :options="authOptions"
          v-model:optionsSelected="searchData.authSelected"
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
// 권한
const authOptions = reactive([
  { label: '전체', value: '전체' },
  { label: '일반(마케터)', value: '일반(마케터)' },
  { label: '팀장', value: '팀장' },
  { label: '거버넌트(현업)', value: '거버넌트(현업)' },
  { label: 'IT(Admin)', value: 'IT(Admin)' },
]);

const searchData = reactive({
  programId: '',
  menuName: '',
  useYnSelected: { label: '전체', value: '전체' },
  menuModuleName: '',
  upperMenuId: '',
  authSelected: { label: '전체', value: '전체' },
});

const emit = defineEmits(['search']);
const onSearch = () => {
  emit('search', searchData);
};
</script>
