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
      <div class="more-infos" v-if="selectedValue == 1">
        <div class="btn-radios mt32">
          <AppInput
            type="price"
            v-model="inputValue"
            labelName="타겟 건수"
            placeholder="숫자만 입력"
          />
          <AppSelectBox
            :options="selectOptions"
            v-model:optionsSelected="optionsSelected"
            labelName="대조군 건수"
          />
        </div>
        <div class="step-info mt16">
          <i class="icon"></i>목표 타겟 건수는 1~999,999,999까지만 입력
          가능합니다.
        </div>
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
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { reactive, ref } from 'vue';

const emit = defineEmits(['prev', 'next']);

const selectedValue = ref('');

// 타겟 건수
const inputValue = ref('');
// 대조군 건수
const selectOptions = reactive([
  { label: '전체', value: 0 },
  { label: '10%', value: 10 },
  { label: '20%', value: 20 },
  { label: '30%', value: 30 },
]);
const optionsSelected = ref({ label: '전체', value: 0 });
</script>
