<template>
  <div class="window-contents">
    <div class="window-header">
      <div class="back-title">
        <button class="btn-back">뒤로</button>
        세그 상세 정보
      </div>
    </div>
    <div class="window-body pd-wrap-lr">
      <div class="scroll-wrap">
        <div class="top-row">
          <div class="sub-title">
            <span>{{ targetCountInfoData.title }}</span>
            <span
              ><span>{{ targetCountInfoData.number }}</span
              ><span>{{ targetCountInfoData.status }}</span></span
            >
          </div>
          <div class="sub-exp">
            <div class="step-info">
              <i class="icon"></i>세그 변경은 목록의 [세그확인] 버튼을 이용해
              주세요.
            </div>
          </div>
        </div>
        <div class="scroll-box seg">
          <div class="seg-wrap">
            <AppWindow></AppWindow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import AppWindow from '@/views/targeting/components/step6/components/SegScene1.vue';
const targetCountInfoData = reactive({
  title: '6월 인터넷 기가업셀_고객센터_OB',
  number: '4회차',
  status: 'AI 타겟 응답완료',
});
</script>
