<template>
  <transition name="fade-view">
    <div class="dialog-wrapper" v-if="view">
      <div class="dialog-box confirm-dialog">
        <div class="dialog-body">
          <span v-html="message"></span>
        </div>
        <div class="dialog-footer">
          <button type="button" class="ui-button" @click="onCancel">
            {{ cancelText }}
          </button>
          <button type="button" class="ui-button" @click="onConfirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  view: {
    type: Boolean,
    default: false,
    required: true,
  },
  message: {
    type: String,
    default: '메세지 내용입니다.',
    required: false,
  },
  type: {
    type: String,
    default: 'confirm', //alert, confirm
    required: false,
  },
  confirmText: {
    type: String,
    default: '확인',
    required: false,
  },
  cancelText: {
    type: String,
    default: '취소',
    required: false,
  },
});
const emit = defineEmits(['update:view', 'confirm', 'cancel']);

const onConfirm = () => {
  closeDialog();
  emit('confirm', '');
};

const onCancel = () => {
  closeDialog();
  emit('cancel', '');
};

const closeDialog = () => {
  emit('update:view', false);
};
</script>
