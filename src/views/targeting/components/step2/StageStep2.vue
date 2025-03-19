<template>
  <StepStage>
    <div class="stage-area">
      <Transition :name="transitionStyle" mode="out-in">
        <component
          :is="getAsyncComponents[currentComponent]"
          @prev="onPrev"
          @next="onNext"
        />
      </Transition>
    </div>
  </StepStage>
</template>

<script setup>
import { ref, toRefs, reactive } from 'vue';
import StepStage from '../StepStage.vue';
import { useDynamicComponents } from './composables/dynamicComponents';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const step2Complete = reactive({
  currentStep: 1,
  // steps: [
  //   { label: '서비스', complete: false },
  //   { label: '상품', complete: false },
  //   { label: '업무', complete: false },
  //   { label: '업무 상세 활동', complete: false },
  //   { label: '채널 ', complete: false },
  //   { label: '상세 채널', complete: false },
  //   { label: '건수', complete: false },
  //   { label: '세그수', complete: false },
  //   { label: '타겟정보', complete: false },
  // ],
});

// const { step2 } = toRefs(props.modelValue);

/*
 * Step별 다이나믹 컴포넌트
 */
const { getAsyncComponents } = useDynamicComponents();
const currentComponent = ref('');
currentComponent.value = `StageScene${step2Complete.currentStep}`;

const transitionStyle = ref('fade-next');

const onPrev = () => {
  transitionStyle.value = 'fade-prev';
  step2Complete.currentStep = step2Complete.currentStep - 1;
  currentComponent.value = `StageScene${step2Complete.currentStep}`;
};

const onNext = () => {
  transitionStyle.value = 'fade-next';
  step2Complete.currentStep = step2Complete.currentStep + 1;
  currentComponent.value = `StageScene${step2Complete.currentStep}`;
};
</script>
