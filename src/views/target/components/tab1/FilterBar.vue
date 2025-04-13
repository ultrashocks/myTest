<template>
  <div class="filter-container">
    <div class="d-flex align-center">
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
      <button class="btn-filter-open-modal" @click="ontargetModal01">
        <i class="icon"></i>
      </button>
      <div style="margin-left: auto">
        <button class="btn-common" @click="onTargetModal03">
          타겟 그룹 지정
        </button>
        <button
          class="btn-common"
          @click="handleTargetModal"
          style="margin-left: 8px"
        >
          타겟 그룹 관리
        </button>
      </div>
    </div>
    <AppWindow v-model:view="targetModal01" width="1000px" height="680px">
      <FilterModal @cancel="targetModal01 = false" @confirm="onWindowConfirm" />
    </AppWindow>
    <AppWindow v-model:view="targetModal02" width="650px" height="688px">
      <TargetGroupModal
        @cancel="targetModal02 = false"
        @confirm="onWindowConfirm02"
      />
    </AppWindow>
    <AppWindow v-model:view="targetModal03" width="590px" height="381px">
      <TargetFocusModal
        @cancel="targetModal03 = false"
        @confirm="onWindowConfirm03"
      />
    </AppWindow>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import AppWindow from '@/components/ui/AppWindow.vue';
import FilterModal from '@/views/target/components/modal/FilterModal.vue';
import TargetGroupModal from '@/views/target/components/modal/TargetGroupModal.vue';
import TargetFocusModal from '@/views/target/components/modal/TargetFocusModal.vue';

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

const handleTargetModal = type => {
  onTargetModal02();
};

// 셀렉트박스
const selectOptions = reactive([
  { label: '15', value: 15 },
  { label: '30', value: 30 },
  { label: '50', value: 50 },
]);
const optionsSelected = ref({ label: '15', value: 15 });

// 모달1
const targetModal01 = ref(false);
const ontargetModal01 = () => {
  targetModal01.value = true;
};
const onWindowConfirm = () => {
  targetModal01.value = false;
  alert('적용');
};

// 모달2
const targetModal02 = ref(false);
const onTargetModal02 = () => {
  selectedButton.value = null;
  targetModal02.value = true;
};
const onWindowConfirm02 = () => {
  targetModal02.value = false;
  selectedButton.value = null;
  alert('적용');
};

// 모달 03
const targetModal03 = ref(false);
const onTargetModal03 = () => {
  selectedButton.value = null;
  targetModal03.value = true;
};
const onWindowConfirm03 = () => {
  targetModal03.value = false;
  selectedButton.value = null;
  alert('적용');
};
</script>
