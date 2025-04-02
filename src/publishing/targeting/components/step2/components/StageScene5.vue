<template>
  <div class="stage-items step2">
    <div class="item-row col-3">
      <div class="title-s">타겟 채널 선택</div>
      <div class="title">
        어떤 <strong class="red">채널</strong>을 <strong>타겟</strong> 하시나요?
      </div>
      <div class="btn-radios">
        <label>
          <input
            type="radio"
            name="customer"
            value="디지털"
            v-model="selectedValue"
          />
          <span class="btn-radio">디지털</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="고객센터"
            v-model="selectedValue"
          />
          <span class="btn-radio">고객센터</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer"
            value="매장"
            v-model="selectedValue"
          />
          <span class="btn-radio">매장</span>
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
