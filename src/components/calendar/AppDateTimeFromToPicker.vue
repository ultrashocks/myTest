<template>
  <div>
    <!-- :close-on-auto-apply="false" -->
    <VueDatePicker
      v-model="dateValue"
      locale="ko"
      :format="format"
      auto-apply
      placeholder="Select Date"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      week-start="0"
      time-picker-inline
      minutes-increment="1"
      minutes-grid-increment="1"
      :is-24="is24"
      close-on-scroll
      :highlight-week-days="[0, 6]"
      :clearable="false"
      :enable-seconds="isSeconds"
      :teleport="teleport"
      :enable-time-picker="false"
      range
      :multi-calendars="true"
    >
      <template #input-icon></template>
    </VueDatePicker>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  fromDate: {
    type: Date,
    default: new Date(),
  },
  toDate: {
    type: Date,
    default: new Date(),
  },
  format: {
    type: String,
    default: 'yyyy-MM-dd',
  },
  disabled: {
    type: Boolean,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  is24: {
    type: Boolean,
    default: false,
  },
  isSeconds: {
    type: Boolean,
    default: false,
  },
  teleport: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:fromDate', 'update:toDate']);

const dateValue = ref([props.fromDate, props.toDate]);

watch(dateValue, () => {
  emit('update:fromDate', dateValue.value[0]);
  emit('update:toDate', dateValue.value[1]);
});

onMounted(() => {
  dateValue.value = [props.fromDate, props.toDate];
});
</script>
