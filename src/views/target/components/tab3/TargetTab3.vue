<template>
  <div class="seg-wrap">
    <div class="seg-header">
      <ul class="seg-header-inner">
        <li>
          <span v-if="togglePage" class="seg-type-title">AI 추천 세그</span>
          <span v-else class="seg-type-title">세그 직접입력</span>
        </li>
        <li>
          <span v-if="togglePage" class="seg-type-info">AI가 분석한 세그먼트를 확인하세요</span>
          <span v-else class="seg-type-info mt30">전체 타겟 수로 진행하시거나, 3단계까지 구분하실 수 있습니다.</span>
        </li>
        <li class="d-flex align-center" v-if="togglePage">
          <div class="custom-checkbox" style="margin-right: 5px">
            <label>
              <input type="checkbox" @click="chkFunction($event)" checked />
              <i class="icon"></i>
            </label>
          </div>
          <span class="font-size-14"
          >추천 및 추가한 세그를 회차마다 유지하여 사용하겠습니다.</span
          >
          <button
              class="btn-info ml0"
              v-tippy="{
                content: `유지 사용을 해제하시면, 세그가 매 회자 변경됩니다.<br>CMS연동으로 타겟을 생성하시는 경우,<br>매 회차 CMS로 보내기를 진행해 주셔야 정상적으로<br>실행 정의를 진행하실 수 있으니 유지 여부를 확인해 주세요.`,
                placement: 'right-start',
                allowHTML: true,
                maxWidth: 500,
              }"
              ref="tooltipButton"
          >
            <span>도움말</span>
          </button>
        </li>
        <li class="btn-m button" @click="changedSegView">
          <span v-if="togglePage">세그 직접 입력으로 변경</span>
          <span v-else>AI 추천으로 돌아갈래요</span>
        </li>
      </ul>
    </div>
    <AppWindow></AppWindow>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';


import AppWindow from '@/views/targeting/components/step6/components/SegScene1.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const { step1 } = toRefs(props.modelValue);
</script>
