<template>
  <div class="stage-items step2">
    <div class="item-row col-6">
      <div class="title-s">타겟 서비스 선택</div>
      <div class="title">
        어떤 <strong class="red">서비스</strong>를
        <strong>타겟</strong> 하시나요?
      </div>
      <div class="btn-radios">
        <label>
          <input
            type="radio"
            name="customer"
            value="모바일"
            v-model="selectedValue"
          />
          <span class="btn-radio">모바일</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="인터넷"
            v-model="selectedValue"
          />
          <span class="btn-radio">인터넷</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="TV"
            v-model="selectedValue"
          />
          <span class="btn-radio">TV</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="스마트홈"
            v-model="selectedValue"
          />
          <span class="btn-radio">스마트홈</span>
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
        <label>
          <input
            type="radio"
            name="customer"
            value="기타2"
            v-model="selectedValue"
          />
          <span class="btn-radio">기타2</span>
        </label>
      </div>
    </div>
    <div class="step2-controls">
      <button class="btn-top" :disabled="true" @click="$emit('prev')">
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
