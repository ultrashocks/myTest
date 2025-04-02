<template>
  <h1>TargetTab4</h1>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const { step1 } = toRefs(props.modelValue);
</script>
