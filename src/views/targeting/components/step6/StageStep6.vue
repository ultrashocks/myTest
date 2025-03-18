<template>
  <StepStage>
    <h1>Stage6</h1>
    {{ step6.data }}
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

const { step6 } = toRefs(props.modelValue);
</script>
