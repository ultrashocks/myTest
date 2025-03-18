<template>
  <StepStage>
    <h1>Stage8</h1>
    {{ step8.data }}
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

const { step8 } = toRefs(props.modelValue);
</script>
