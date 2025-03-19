<template>
  <div class="stage-items step2">
    <div class="item-row">
      <div class="title-s">목표 타겟 건수 설정</div>
      <div class="title">
        <strong>목표 타겟</strong> <strong class="red">건수</strong>가
        있으신가요?
      </div>
      <div class="btn-radios">
        <label>
          <input
            type="radio"
            name="customer"
            value="1"
            v-model="selectedValue"
          />
          <span class="btn-radio">있어요</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="0"
            v-model="selectedValue"
          />
          <span class="btn-radio"
            >없어요<span class="txt-s">(평균값 적용)</span></span
          >
        </label>
      </div>
      <div class="step-info mt16">
        <i class="icon"></i>목표 타겟 없음을 선택하시면, 비슷한 타겟팅의
        평균으로 자동 세팅됩니다.
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
