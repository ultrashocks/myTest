<template>
  <div class="contents-wrap">
    <section class="targeting-wrap">
      <TopSteps :data="stepsComplete" @selectStep="onSelectStep" />
      <div class="targeting-contents" :class="{ 'side-show': sideShow }">
        <Transition name="targeting-side">
          <SideTargeting
            v-if="stepsComplete.currentStep > 1"
            v-model:selectStep2Scene="selectStep2Scene"
            v-model:selectStep="stepsComplete.currentStep"
            :sideShow="sideShow"
            @moveStep2="onMoveStep2"
            @moveStep3="onMoveStep3"
            @sideShowHide="onSideShowHide"
          />
        </Transition>
        <Transition
          :name="transitionStyle"
          mode="out-in"
          @after-enter="onAfterEnter"
        >
          <component
            v-model="stepData"
            :is="getAsyncComponents[currentComponent]"
            @stepComplete="onStepComplete"
            v-model:selectStep2Scene="selectStep2Scene"
          />
        </Transition>
      </div>
      <BottomControlls :btnState="stepBtnState" @changeStep="onChangeStep" />
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import TopSteps from './components/TopSteps.vue';
import BottomControlls from './components/BottomControlls.vue';
import SideTargeting from './components/SideTargeting.vue';
import { useDynamicComponents } from './composables/dynamicComponents';

/*
 * 상단 현재 Step 상태보기
 */
const stepsComplete = reactive({
  currentStep: 3,
  steps: [
    { label: '설정 시작', complete: true },
    { label: '기본 정보 입력', complete: true },
    { label: '성공 기준', complete: true },
    { label: '상세 조건', complete: true },
    { label: '타겟 추천', complete: true },
    { label: '세그 구분', complete: true },
    { label: '타겟 생성', complete: true },
    { label: '일정/연동타겟', complete: true },
  ],
});
const onSelectStep = step => {
  transitionStyle.value =
    stepsComplete.currentStep > step ? 'fade-prev' : 'fade-next';
  stepsComplete.currentStep = step;
  currentComponent.value = `StageStep${stepsComplete.currentStep}`;
};

/*
 * Step별 다이나믹 컴포넌트
 */
const { getAsyncComponents } = useDynamicComponents();
const currentComponent = ref('');
currentComponent.value = `StageStep${stepsComplete.currentStep}`;

/*
 * 하단 Step이동 버튼 제어
 */
let stepChangeState = false;
const transitionStyle = ref('fade-next');
// 다음, 이전 이동
const onChangeStep = value => {
  if (
    stepChangeState ||
    (stepsComplete.currentStep === 1 && value < 0) ||
    (stepsComplete.currentStep === 8 && value > 0)
  )
    return;
  transitionStyle.value = value > 0 ? 'fade-next' : 'fade-prev';
  stepsComplete.currentStep = stepsComplete.currentStep + value;
  currentComponent.value = `StageStep${stepsComplete.currentStep}`;
  stepChangeState = true;
};
// 화면전환 완료 체크
const onAfterEnter = () => {
  stepChangeState = false;
};

// 버튼 활성화 제어
const stepBtnState = reactive({ prev: false, next: false });
const checkStepBtn = () => {
  const currentComplete =
    stepsComplete.steps[stepsComplete.currentStep - 1].complete;
  switch (stepsComplete.currentStep) {
    case 1:
      stepBtnState.prev = false;
      stepBtnState.next = currentComplete;
      break;
    case 8:
      stepBtnState.prev = true;
      stepBtnState.next = false;
      break;
    default:
      stepBtnState.prev = true;
      stepBtnState.next = currentComplete;
      break;
  }
};

const onStepComplete = value => {
  console.log(value);
  const { step, complete } = value;
  stepsComplete.steps[Number(step) - 1].complete = complete;
};

// Step별 데이터
const stepData = ref({
  step1: {
    targetingName: '',
    customerSelected: { label: '선택', value: 0 },
    customer: '',
    basicInfo: '',
    cms: '',
    marketing: {
      code: '',
      name: '',
    },
  },
  step2: { data: 'test2' },
  step3: { data: 'test3' },
  step4: { data: 'test4' },
  step5: { data: 'test5' },
  step6: { data: 'test6' },
  step7: { data: 'test7' },
  step8: { data: 'test8' },
});

const selectStep2Scene = ref(1);
const onMoveStep2 = step => {
  onSelectStep(2);
  selectStep2Scene.value = step;
};

const onMoveStep3 = () => {
  onSelectStep(3);
};

const sideShow = ref(true);
const onSideShowHide = () => {
  sideShow.value = !sideShow.value;
};

const windowWidth = ref(window.innerWidth);
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value < 1440) {
    sideShow.value = false;
  }
};
onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// Step 변경시 마다 실행
watch(
  stepsComplete,
  () => {
    checkStepBtn();
  },
  { immediate: true },
);
</script>
