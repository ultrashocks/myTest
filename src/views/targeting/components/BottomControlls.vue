<template>
  <div class="bottom-controlls">
    <div class="control-l">
      <button class="btn-targeting">취소</button>
      <button class="btn-targeting">임시저장</button>
    </div>
    <div class="control-r">
      <button
        class="btn-step prev"
        :disabled="!btnState.prev"
        @click="onStep(-1)"
      >
        <span>이전</span>
      </button>
      <button
        class="btn-step next"
        :disabled="!btnState.next"
        @click="onStep(1)"
      >
        <span>다음</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  btnState: {
    type: Object,
    default: () => ({ prev: false, next: false }),
  },
});
const emit = defineEmits(['changeStep']);
const onStep = value => {
  emit('changeStep', value);
};
</script>
