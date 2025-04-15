<template>
  <div class="contents-wrap">
    <section class="targeting-wrap">
      <div class="top-title">
        <div class="inner-block">
          <button class="btn-back">뒤로</button>
          <div class="title">세그 확인</div>
        </div>
      </div>
      <div class="targeting-contents">
        <div class="step-stage"></div>
      </div>
      <div class="bottom-controlls">
        <div class="control-l">
          <button class="btn-targeting">취소</button>
        </div>
        <div class="control-r">
          <button class="btn-step next"><span>다음</span></button>
          <button class="btn-step complete"><span>설정 저장</span></button>
          <button class="btn-step complete"><span>CMS로 보내기</span></button>
          <button class="btn-step complete">
            <span>타겟 저장 후 종료</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const { step1 } = toRefs(props.modelValue);
</script>
