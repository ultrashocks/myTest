<template>
  <StepStage>
    <h1>Stage5</h1>
    {{ step5.data }}
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

const { step5 } = toRefs(props.modelValue);
</script>
