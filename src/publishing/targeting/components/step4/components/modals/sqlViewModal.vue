<template>
  <div v-if="view" class="sql-view-modal" style="position: fixed; right: 0; top: 0; width: 80%; height: 100%; background-color: #fff; transform: translate(-10%); z-index: 3000;">
    <div class="m-auto" style="border-radius: 4px; border: 1px solid #333; height: 100%; padding: 16px 28px">
      <div class="window-contents m-auto  position relative" style="border-radius: 4px; border: 1px solid #333; height: 100%">
        <span class="btn-close" @click="onCancel">닫기</span>
        <div class="window-header"> SQL 확인 </div>
        <div class="window-header"> {{ targetName }} </div>
        <div class="window-body" style="height: 100%">
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
