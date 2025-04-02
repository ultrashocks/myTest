<template>
  <StepStage>
    <div class="seg-wrap">
      <div class="seg-header">
        <ul class="seg-header-inner">
          <li><span class="seg-type-title">AI 추천 세그</span></li>
          <li><span class="seg-type-info">AI가 분석한 세그먼트를 확인하세요</span></li>
          <li class="d-flex align-center">
            <div class="custom-checkbox" style="margin-right: 5px">
              <label>
                <input type="checkbox" @click="chkFunction($event)" checked />
                <i class="icon"></i>
              </label>
            </div>
            <span class="font-size-14">추천 및 추가한 세그를 회차마다 유지하여 사용하겠습니다.</span>
            <button
              class="btn-info ml0"
              v-tippy="{
                content: `유지 사용을 해제하시면, 세그가 매 회자 변경됩니다.<br>CMS연동으로 타겟을 생성하시는 경우,<br>매 회차 CMS로 보내기를 진행해 주셔야 정상적으로<br>실행 정의를 진행하실 수 있으니 유지 여부를 확인해 주세요.`,
                placement: 'right-start',
                allowHTML: true,
                maxWidth: 500,
              }"
            >
              <span>도움말</span>
            </button>
          </li>
          <li class="btn-m button" @click="changedSegView">세그 직접 입력으로 변경</li>
        </ul>
      </div>
      <Transition :name="transitionStyle" mode="out-in">
        <component :is="getAsyncComponents[currentComponent]" />
      </Transition>
    </div>
  </StepStage>
</template>

<script setup>
import { onMounted, ref, toRefs, watch } from 'vue';
import { useDynamicComponents } from './composables/dynamicComponents';
const { getAsyncComponents } = useDynamicComponents();
import { directive as vTippy } from 'vue-tippy';

import StepStage from '../StepStage.vue';
const transitionStyle = ref('fade-none');
const currentComponent = ref('');

const goAiSeg = () => {
  transitionStyle.value = 'fade-next';
  currentComponent.value = `SegScene1`;
};

const changedSegView = () => {
  if (currentComponent.value === `SegScene2`) {
    currentComponent.value = `SegScene1`;
  } else {
    currentComponent.value = `SegScene2`;
  }
  transitionStyle.value = 'fade-infowindow';
};

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

onMounted(() => {
  goAiSeg();
});

//체크박스 이벤트
const chkFunction = e => {
  if (e.target.checked) {
    alert("체크상태")
  } else {
    alert("비체크상태 여기서 말머리 나오게")

  }
};

const { step6 } = toRefs(props.modelValue);
</script>
