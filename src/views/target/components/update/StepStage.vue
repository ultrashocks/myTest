<template>
  <div class="step-stage">
    <div class="stage-box">
      <div class="box-content" :style="style">
        <div class="content-area">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  style: {
    type: Object,
    default: () => ({}),
  },
});
</script>
