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
import { watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  selectStep2Scene: {
    type: [String, Number],
    default: 1,
  },
});

const step2Complete = reactive({
  currentStep: 1,
});

/*
 * Step별 다이나믹 컴포넌트
 */
const { getAsyncComponents } = useDynamicComponents();
const currentComponent = ref('');
step2Complete.currentStep = props.selectStep2Scene;
currentComponent.value = `StageScene${step2Complete.currentStep}`;

const transitionStyle = ref('fade-none');

const emit = defineEmits(['update:selectStep2Scene']);

const onPrev = () => {
  transitionStyle.value = 'fade-prev';
  step2Complete.currentStep = step2Complete.currentStep - 1;
  currentComponent.value = `StageScene${step2Complete.currentStep}`;
  emit('update:selectStep2Scene', step2Complete.currentStep);
};

const onNext = () => {
  transitionStyle.value = 'fade-next';
  step2Complete.currentStep = step2Complete.currentStep + 1;
  currentComponent.value = `StageScene${step2Complete.currentStep}`;
  emit('update:selectStep2Scene', step2Complete.currentStep);
};

const onSelectStep = step => {
  transitionStyle.value =
    step2Complete.currentStep > step ? 'fade-prev' : 'fade-next';
  step2Complete.currentStep = step;
  currentComponent.value = `StageScene${step2Complete.currentStep}`;
  emit('update:selectStep2Scene', step2Complete.currentStep);
};

watch(
  () => props.selectStep2Scene,
  () => {
    console.log('실행???', props.selectStep2Scene);
    onSelectStep(props.selectStep2Scene);
  },
);
</script>
