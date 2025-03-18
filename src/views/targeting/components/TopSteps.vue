<template>
  <div class="top-steps">
    <div
      class="step-item"
      :class="{
        complete: item.complete,
        active: data.currentStep === index + 1,
        'line-active': index + 1 <= data.currentStep,
      }"
      v-for="(item, index) in data.steps"
      :key="item.label"
    >
      <div class="item">
        <button
          class="circle"
          :disabled="!item.complete"
          @click="onStepClick(index + 1)"
        >
          {{ index + 1 }}
        </button>
        <div class="label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(['selectStep']);
const onStepClick = step => {
  emit('selectStep', step);
};
</script>
