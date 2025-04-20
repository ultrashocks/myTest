<template>
  <div v-if="view" class="sql-view-modal">
    <div class="m-auto">
      <div class="window-contents m-auto position relative">
        <span class="btn-close" @click="onCancel">닫기</span>
        <div class="window-header">SQL 확인</div>
        <div class="window-header">{{ targetName }}</div>
        <div class="window-body">
          <div class="sqlAddMid">
            <textarea :value="sqlText"></textarea>
          </div>
        </div>
        <div class="window-footer">
          <button class="btn-s gray" @click="onCancel">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  view: {
    type: Boolean,
    default: false,
    required: true,
  },
  sqlText: {
    type: String,
    default: '',
  },
  targetName: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['cancel']);
const onCancel = () => {
  emit('cancel');
};
</script>
