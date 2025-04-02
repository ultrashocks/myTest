<template>
  <StepStage>
    <div class="stage-area">
      <div class="stage-items scene-complete">
        <div class="scene-complete__wrap">
          <div class="complete-content">
            <i class="icon"></i>
            <div class="info-title">
              <strong>Target</strong> <strong class="red">신규 생성</strong>이
              완료되었습니다.
            </div>
            <div class="info-text">
              목록에서 타겟 설정 정보를 확인하실 수 있습니다.
            </div>
            <div class="item-row">
              <button class="btn-link" @click="onNew">새로 작성</button>
              <button class="btn-link" @click="onList">목록으로 이동</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </StepStage>
</template>

<script setup>
import StepStage from '../StepStage.vue';

const emit = defineEmits(['new']);
const onNew = () => {
  emit('new');
};

const onList = () => {};
</script>
