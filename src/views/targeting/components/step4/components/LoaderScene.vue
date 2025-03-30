<template>
  <div class="stage-items scene-loader">
    <div class="scene-loader__wrap">
      <div class="loader-content">
        <div class="loader-symbol"></div>
        <div class="title">
          <strong>모수 체크 중이예요.</strong> 잠시만 기다려 주세요.
        </div>
        <div class="title-s">
          조건에 따른 모수 체크까지 시간이 소요될 수 있습니다.
        </div>
        <div class="infos">
          <ul>
            <li>
              <i class="icon"></i>[나중에 확인하기] 버튼을 누르시면 현재 상태로
              임시 저장되며 목록으로 이동됩니다.
            </li>
            <li>
              <i class="icon"></i>모수 체크가 완료되면, 메일과 문자로 알림이
              전송됩니다.
            </li>
          </ul>
        </div>
        <button class="btn-confirm" @click="emit('update:displayYn', false)">
          나중에 확인하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  displayYn: Boolean,
});

const emit = defineEmits(['update:displayYn']);
</script>
