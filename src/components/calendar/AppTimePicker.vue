<template>
  <div class="time-picker">
    <div class="select-label__comp" v-if="labelName !== ''">
      {{ labelName }}
    </div>
    <VueDatePicker
      v-model="timeData"
      locale="ko"
      placeholder="Select Time"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      :clearable="false"
      :teleport="teleport"
      :is-24="false"
      cancelText="취소"
      selectText="적용"
      time-picker
    >
      <template #input-icon>
        <i class="icon"></i>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  time: {
    type: Object,
    default: () => ({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  teleport: {
    type: Boolean,
    default: false,
  },
  labelName: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:time']);

const timeValue = ref({ ...props.time });
const timeData = ref(
  new Date(0, 0, 0, timeValue.value.hours, timeValue.value.minutes),
);

watch(
  () => timeData.value,
  () => {
    emit('update:time', timeData.value);
  },
);

onMounted(() => {
  timeValue.value = props.time;
  timeData.value = new Date(
    0,
    0,
    0,
    timeValue.value.hours,
    timeValue.value.minutes,
  );
});
</script>
