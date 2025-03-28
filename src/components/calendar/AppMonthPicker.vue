<template>
  <div>
    <VueDatePicker
      v-model="dateValue"
      locale="ko"
      :format="format"
      month-picker
      auto-apply
      placeholder="Select Month"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      week-start="0"
      close-on-scroll
      :clearable="false"
      :teleport="teleport"
    ></VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  date: {
    type: Object as () => { month: number; year: number },
    default: () => {
      const d = new Date();
      return {
        month: d.getMonth(),
        year: d.getFullYear()
      };
    }
  },
  format: {
    type: String,
    default: 'yyyy-MM' //'yyyy-MM-dd HH:mm'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  teleport: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:date']);

const dateValue = ref(props.date);

onMounted(() => {
  watch(dateValue, () => {
    emit('update:date', {
      month: dateValue.value.month,
      year: dateValue.value.year
    });
  });
});
</script>
