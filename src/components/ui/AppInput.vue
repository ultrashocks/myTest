<template>
  <div class="app-input__wrapper">
    <div class="select-label__comp" v-if="labelName !== ''">
      {{ labelName }}
    </div>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      autocomplete="off"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxLength"
      @input="bindNumber"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="emit('inputEnter')"
    />
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
  maxLength: {
    type: [String, Number],
    default: null,
  },
});

const emit = defineEmits(['update:modelValue', 'blur', 'inputEnter']);

// const comma = val => {
//   return String(val).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
// };
// const uncomma = str => {
//   return String(str).replace(/[^\d]+/g, '');
// };

const bindNumber = $event => {
  var value = $event.target.value;
  if (props.type === 'number') {
    const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z]/;
    if (reg.exec(props.modelValue) !== null) {
      let value = props.modelValue;
      emit('update:modelValue', value.replace(/[^0-9]/g, ''));
    }
    if (isNaN(parseFloat(value))) {
      emit('update:modelValue', '');
    }
  }
  // if (props.type === 'price') {
  //   const currency = +value.replace(/[^\d]/g, '').toString();
  //   value = Intl.NumberFormat().format(currency);
  //   checkPriceComma();
  // }
  emit('update:modelValue', value);
};

const onFocus = $event => {
  if (props.readonly) return;
  var value = $event.target.value;
  if (props.type === 'number' || props.type === 'price') {
    if (props.modelValue == 0) {
      emit('update:modelValue', '');
    }
  }
  if (props.type === 'price') {
    let result = value.replace(/[^0-9]/g, '');
    emit('update:modelValue', result);
  }
};
const onBlur = $event => {
  if (props.readonly) return;
  var value = $event.target.value;
  if (props.type === 'price') {
    //문자만 입력된 경우
    let result = value.replace(/[^0-9]/g, '');
    emit('update:modelValue', result);

    const currency = result.replace(/[^\d]/g, '').toString();
    value = Intl.NumberFormat().format(currency);
    checkPriceComma();
  }
  // if (props.type === 'number' || props.type === 'price') {
  //   if (props.modelValue == 0) {
  //     emit('update:modelValue', 0);
  //   }
  // }
};
const checkPriceComma = () => {
  let priceValue = String(props.modelValue);
  var currency = priceValue.replace(/[^\d]/g, '').toString();
  priceValue = Intl.NumberFormat().format(currency);
  if (priceValue == 0) return;
  emit('update:modelValue', priceValue);
};

if (props.type === 'price') {
  checkPriceComma();
}
</script>
