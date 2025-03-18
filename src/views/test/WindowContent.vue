<template>
  <div class="window-contents">
    <div class="window-header">마케팅 활동코드</div>
    <div class="window-body">컨텐츠 내용</div>
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
