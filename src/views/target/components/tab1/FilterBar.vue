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
      <div class="btn-filter open-modal">
        <button @click="ontargetModal01">
          <i class="btn-op-modal"></i>
        </button>
      </div>
      <div
        class="btn-filter"
        style="margin-left: auto"
        @click="handleTargetModal(index)"
        :class="{ selected: selectedButton === index }"
      >
        <button>타겟 그룹 설정</button>
      </div>
    </div>
    <AppWindow v-model:view="targetModal01" width="650px" height="600px">
      <FilterModal @cancel="targetModal01 = false" @confirm="onWindowConfirm" />
    </AppWindow>
    <AppWindow v-model:view="targetModal02" width="650px" height="680px">
      <TargetGroupModal
        @cancel="targetModal02 = false"
        @confirm="onWindowConfirm02"
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

const handleTargetModal = index => {
  selectedButton.value = index;
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
</script>
