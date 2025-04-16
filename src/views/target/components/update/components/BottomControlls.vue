<template>
  <div class="bottom-controlls">
    <div class="control-l">
      <button class="btn-targeting">취소</button>
      <button class="btn-targeting">임시저장</button>
    </div>
    <div class="control-r">
      <button
        class="btn-step prev"
        :disabled="!btnState.prev || currentStep == 0"
        @click="onStep(-1)"
      >
        <span>이전</span>
      </button>
      <template v-if="currentStep == 8">
        <button
          class="btn-step complete"
          @click="onComplete"
          v-tippy="{
            content:
              '타겟팅 실행 기간, 실행주기와 연동타겟 ID<br> 설정은 지금 입력하지 않으셔도 됩니다.<br>목록에서 [일정입력]을 통해 설정하실 수<br> 있습니다.',
            placement: 'top',
            allowHTML: true,
            showOnCreate: true,
            hideOnClick: false,
          }"
          ref="tooltipButton"
        >
          <span>설정 저장</span>
        </button>
      </template>
      <template v-else>
        <button
          class="btn-step next"
          :disabled="!btnState.next"
          @click="onStep(1)"
        >
          <span>다음</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import { directive as vTippy } from 'vue-tippy';
const props = defineProps({
  btnState: {
    type: Object,
    default: () => ({ prev: false, next: false }),
  },
  currentStep: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits(['changeStep', 'complete']);
const onStep = value => {
  emit('changeStep', value);
};

const onComplete = () => {
  emit('complete');
};

const tooltipButton = ref(null);
onMounted(() => {
  if (props.currentStep == 8) {
    setTimeout(() => {
      const tooltip = tooltipButton.value._tippy;
      tooltip.hide();
    }, 3000);
  }
});

let timeout = null;
watch(
  () => props.currentStep,
  () => {
    if (props.currentStep == 8) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const tooltip = tooltipButton.value._tippy;
        tooltip.hide();
      }, 3000);
    }
  },
);
</script>
