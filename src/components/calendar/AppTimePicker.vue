<template>
  <div>
    <VueDatePicker
      v-model="timeData"
      locale="ko"
      placeholder="Select Time"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      :clearable="true"
      :teleport="teleport"
      time-picker
    >
      <template #input-icon></template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
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
