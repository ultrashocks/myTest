<template>
  <body>
    <h1>업데이트 페이지 입니다!!!</h1>
  </body>
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
