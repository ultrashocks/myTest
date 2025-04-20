<template>
  <div class="window-contents">
    <div class="window-header">타겟 복사</div>
    <div class="window-body pd-wrap-lr copy-moadl">
      <div class="stage-area">
        <div class="stage-items step1">
          <div class="item-row">
            <div class="title-s mb4">타겟명</div>
            <div class="duplication-check">
              <div class="duplication-input">
                <AppInput
                  type="text"
                  modelValue="스마트홈_신규_구글패키지_가입"
                  @inputEnter="onDuplicationCheck"
                />
                <button
                  class="btn-duplication"
                  :disabled="modelValue.length < 1"
                  @click="onDuplicationCheck"
                >
                  중복확인
                </button>
              </div>
              <div
                class="result-input__msg"
                :class="checkMsg.state"
                v-if="checkMsg.state && step1.modelValue.length > 0"
              >
                {{ checkMsg.message }}
              </div>
            </div>
          </div>
          <div class="item-row mb40">
            <div class="title-s mb4">복사 정보 범위</div>
            <div class="check-group__wrap">
              <div
                class="custom-checkbox"
                v-for="(item, index) in checkedCheck"
                :key="index"
                :class="{ hidden: item.value === '기본 정보' }"
              >
                <label>
                  <input
                    type="checkbox"
                    v-model="infoData.checkValue"
                    :value="item.value"
                    :disabled="item.value === '' && item.checked === false"
                  />
                  <i class="icon"></i>
                  <span>{{ item.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button class="btn-s red">적용</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const checkMsg = reactive({
  state: '',
  message: '',
});

const onDuplicationCheck = () => {
  // 타겟 이름 조회 실행

  // 실행후 결과값 처리
  if (props.modelValue === '테스트') {
    checkMsg.message = '이미 사용 중인 타겟 이름입니다.';
    checkMsg.state = 'error';
  } else {
    checkMsg.message = '사용할 수 있는 타겟 이름입니다.';
    checkMsg.state = 'success';
  }

  if (checkMsg.state === 'success') disabledCorver.value = false;
};

const disabledCorver = ref(true);

const checkedCheck = ref([
  { name: '기본 정보', value: '', checked: false },
  { name: '기본 정보', value: '기본 정보', checked: true },
  {
    name: '성공 기준',
    value: '성공 기준',
    checked: false,
  },
  {
    name: '상세 조건(제외/제한조건)',
    value: '상세 조건(제외/제한조건)',
    checked: false,
  },
]);

const infoData = ref({
  checkValue: ['', '기본 정보'],
});

const emit = defineEmits(['cancel', 'confirm']);
const onCancel = () => {
  emit('cancel');
};
</script>
