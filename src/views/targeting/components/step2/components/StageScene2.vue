<template>
  <div class="stage-items step2">
    <div class="item-row col-4">
      <div class="title-s">타겟 상품 선택</div>
      <div class="title">
        어떤 <strong class="red">상품</strong>를 <strong>타겟</strong> 하시나요?
      </div>
      <div class="btn-radios">
        <label>
          <input
            type="radio"
            name="customer"
            value="요금제"
            v-model="selectedValue"
          />
          <span class="btn-radio">요금제</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="부가서비스"
            v-model="selectedValue"
          />
          <span class="btn-radio">부가서비스</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="단말"
            :disabled="true"
            v-model="selectedValue"
          />
          <span class="btn-radio">단말</span>
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
