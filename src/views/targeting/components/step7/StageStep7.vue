<template>
  <StepStage>
    <h1>Stage7</h1>
    {{ step7.data }}
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

const { step7 } = toRefs(props.modelValue);
</script>
