<template>
  <div class="stage-items step2">
    <div class="item-row">
      <div class="title-s">목표 최대 세그 수 설정</div>
      <div class="title">
        <strong>목표 최대</strong> <strong class="red">세그 수</strong>가
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
            value="2"
            v-model="selectedValue"
          />
          <span class="btn-radio"
            >없어요<span class="txt-s">(AI 추천)</span></span
          >
        </label>
      </div>
      <div class="step-infos" v-if="selectedValue != 1">
        <div class="step-info mt16">
          <i class="icon"></i>목표 최대 세그 수를 설정하시면, 해당 세그 수에
          맞춰 AI가 세그를 추천합니다.
        </div>
        <div class="step-info mt5">
          <i class="icon"></i>목표 최대 세그 수 없음을 선택하시면, AI 추천으로
          세그 수가 설정됩니다.
        </div>
      </div>
      <div class="more-infos" v-if="selectedValue == 1">
        <div class="btn-radios mt32">
          <AppInput
            type="price"
            v-model="inputValue"
            labelName="최대 세그 수"
            placeholder="숫자만 입력"
          />
        </div>
        <div class="step-info mt16">
          <i class="icon"></i>최대 세그 수는 1~30까지만 입력 가능합니다.
        </div>
      </div>

      <button
        class="btn-basicInfos mt32"
        :disabled="!checkActiveBtn()"
        @click="$emit('next')"
      >
        기본 정보 입력 확인<i class="icon"></i>
      </button>
    </div>
    <div class="step2-controls">
      <button class="btn-top" :disabled="false" @click="$emit('prev')">
        <i class="icon"></i>
      </button>
      <button class="btn-bottom" :disabled="true">
        <i class="icon"></i>
      </button>
      <!-- <button
        class="btn-bottom"
        :disabled="!checkActiveBtn()"
        @click="$emit('next')"
      >
        <i class="icon"></i>
      </button> -->
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

const checkActiveBtn = () => {
  if (
    selectedValue.value == 2 ||
    (selectedValue.value == 1 && inputValue.value !== '')
  ) {
    return true;
  }
};
</script>
