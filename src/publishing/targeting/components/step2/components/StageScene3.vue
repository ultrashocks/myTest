<template>
  <div class="stage-items step2">
    <div class="item-row col-5">
      <div class="title-s">타겟 업무 선택</div>
      <div class="title">
        어떤 <strong class="red">업무</strong>를 <strong>타겟</strong> 하시나요?
      </div>
      <div class="btn-radios">
        <label>
          <input
            type="radio"
            name="customer"
            value="상품변경"
            v-model="selectedValue"
          />
          <span class="btn-radio">상품변경</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="신규가입"
            v-model="selectedValue"
          />
          <span class="btn-radio">신규가입</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="약정갱신"
            v-model="selectedValue"
          />
          <span class="btn-radio">약정갱신</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="해지방어"
            v-model="selectedValue"
          />
          <span class="btn-radio">해지방어</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="관계형성"
            v-model="selectedValue"
          />
          <span class="btn-radio">관계형성</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="상품결합"
            v-model="selectedValue"
          />
          <span class="btn-radio">상품결합</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="제휴"
            v-model="selectedValue"
          />
          <span class="btn-radio">제휴</span>
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
import { ref, watch } from 'vue';

const props = defineProps({});

const emit = defineEmits(['prev', 'next']);

const selectedValue = ref('');

watch(selectedValue, () => {
  emit('next');
});
</script>
