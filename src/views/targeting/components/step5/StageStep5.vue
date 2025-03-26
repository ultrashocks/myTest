<template>
  <StepStage>
    <div class="stage-area">
      <transition name="fade" mode="out-in">
        <component
          :is="getAsyncComponents[currentComponent]"
          @confirm="onConfirmNext"
        />
      </transition>
    </div>
  </StepStage>
</template>

<script setup>
import { ref } from 'vue';
import StepStage from '../StepStage.vue';
import { useDynamicComponents } from './composables/dynamicComponents';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

// const { step5 } = toRefs(props.modelValue);
const { getAsyncComponents } = useDynamicComponents();
const currentComponent = ref('LoaderScene'); //LoaderScene,  = 'StageScene'

const onConfirmNext = () => {
  currentComponent.value = 'StageScene';
};
</script>
