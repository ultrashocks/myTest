<template>
  <StepStage>
    <h1>Stage4</h1>
    {{ step4.data }}
  </StepStage>
</template>

<script setup>
import { toRefs } from 'vue';
import StepStage from '../StepStage.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const { step4 } = toRefs(props.modelValue);
</script>
