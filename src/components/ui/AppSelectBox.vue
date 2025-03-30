<template>
  <div class="v-select__wrap" :class="direction">
    <div class="select-label__comp" v-if="labelName !== ''">
      {{ labelName }}
    </div>
    <!-- :reduce="option => option.value" -->
    <v-select
      :options="options"
      label="label"
      index="value"
      :modelValue="optionsSelected"
      @update:modelValue="updateSelected"
      :searchable="false"
      :clearable="false"
      :disabled="readonly || disabled"
      :class="{ readonly: readonly }"
      dropdown-position="top"
    >
      <template #open-indicator>
        <span class="icon-v-select"></span>
      </template>
    </v-select>
  </div>
</template>

<script setup>
import vSelect from 'vue-select';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  optionsSelected: {
    type: [Number, String, Object],
    default: '',
  },
  labelName: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'down',
  },
});

const emit = defineEmits(['update:optionsSelected']);

const updateSelected = value => {
  emit('update:optionsSelected', value);
};
</script>
