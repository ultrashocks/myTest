<template>
  <div class="app-input__wrapper">
    <div class="select-label__comp" v-if="labelName !== ''">
      {{ labelName }}
    </div>
    <div class="input-marketing__code">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        autocomplete="off"
        :readonly="readonly"
        :disabled="disabled"
        @input="onInput"
      />
      <!-- <div class="code-value">{{ modelValue }}</div> -->
      <span class="btn-remove" v-if="modelValue.length > 0" @click="onRemove"
        ><i class="icon"></i
      ></span>
      <button
        class="btn-search"
        :disabled="disabled"
        :readonly="readonly"
        @click="$emit('search')"
      >
        <i class="icon"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
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
});

const emit = defineEmits(['update:modelValue', 'remove', 'search']);

const onInput = $event => {
  var value = $event.target.value;
  emit('update:modelValue', value);
};

const onRemove = () => {
  emit('update:modelValue', '');
  emit('remove', '');
};
</script>
