<template>
  <div class="stage-items scene-loader">
    <div class="scene-loader__wrap">
      <div class="loader-content">
        <div class="loader-symbol"><span class="loader"></span></div>
        <div class="title">
          <strong>AI가 타겟 추출 중이예요.</strong> 잠시만 기다려 주세요.
        </div>
        <div class="title-s">
          조건에 따른 타겟 추출까지 시간이 소요될 수 있습니다.
        </div>
        <div class="infos">
          <ul>
            <li>
              <i class="icon"></i>[나중에 확인하기] 버튼을 누르시면 현재 상태로
              임시 저장되며 목록으로 이동됩니다.
            </li>
            <li>
              <i class="icon"></i>타겟 추출이 완료되면, 메일과 문자로 알림이
              전송됩니다.
            </li>
            <!-- [수정 0404] AI 응답이 완료되기 전 화면 재진힙 시 display
            <li>
              <i class="icon"></i>완료 알림을 받으셨다면, [새로고침]해 주세요.
            </li> -->
          </ul>
        </div>
        <button class="btn-confirm" @click="$emit('confirm')">
          <!-- 퍼블에서는 클릭해서 다음화면으로 진행
          **** 개발시 화면설계서 기준으로 개발 요망
          -->
          나중에 확인하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['confirm']);
</script>
