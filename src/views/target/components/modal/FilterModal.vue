<template>
  <div class="window-contents">
    <div class="window-header">상세조회 필터</div>
    <div class="modal-body">
      <ul class="accordion-item">
        <li class="accordion-header">
          <span class="">타겟 유형</span>
        </li>
        <li class="accordion-body">
          <ul class="body-item">
            <li class="title">구분</li>
            <li class="contents">
              <button class="btn">자사</button>
              <button class="btn">타사</button>
            </li>
          </ul>
          <ul class="body-item">
            <li class="title">구분</li>
            <li class="contents">
              <button class="btn">자사</button>
              <button class="btn">타사</button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button class="btn-s red" @click="onConfirm">적용</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['cancel', 'confirm']);
const onCancel = () => {
  emit('cancel');
};

const onConfirm = () => {
  emit('confirm');
};
</script>
