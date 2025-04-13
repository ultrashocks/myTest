<template>
  <div class="filebox button">
    <label class="blue mr5">
      <input
        type="file"
        class="upload-hidden"
        :accept="accept"
        @change="onSelectFile"
        ref="fileInput" />
      {{ label }}<i class="icon"></i
    ></label>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  id: {
    type: [String, Number],
    default: 1,
  },
  accept: {
    type: String,
    default:
      '.png, .txt, .ppt, .pptx, .xls, .xlsx, .doc, .docx, .gif, .jpg, .bmp, .zip, .pdf',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '찾기',
  },
  useCancel: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['changeFile']);

const fileInput = ref(null);

const onSelectFile = event => {
  let selectData = event.target.files[0];
  emit('changeFile', selectData);
};
</script>

<style></style>
