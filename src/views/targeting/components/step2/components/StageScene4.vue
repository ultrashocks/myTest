<template>
  <div class="stage-items step2">
    <div class="item-row">
      <div class="title-s">업무 상세 활동 선택</div>
      <div class="title">
        <strong class="red">업무 상세 활동</strong>은
        <strong>무엇</strong>인가요?
      </div>
      <div class="btn-radios">
        <label>
          <input
            type="radio"
            name="customer"
            value="기가업셀"
            v-model="selectedValue"
          />
          <span class="btn-radio">기가업셀</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="기타"
            v-model="selectedValue"
          />
          <span class="btn-radio">기타</span>
        </label>
      </div>
    </div>
    <div class="step2-controls">
      <button class="btn-top" :disabled="false" @click="$emit('prev')">
        <i class="icon"></i>
      </button>
      <button
        class="btn-bottom"
        :disabled="!selectedValue"
        @click="$emit('next')"
      >
        <i class="icon"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({});

const emit = defineEmits(['prev', 'next']);

const selectedValue = ref('');
</script>
