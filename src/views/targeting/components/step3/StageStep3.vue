<template>
  <StepStage>
    <h1>Stage3</h1>
    {{ step3.data }}
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

const { step3 } = toRefs(props.modelValue);
</script>
