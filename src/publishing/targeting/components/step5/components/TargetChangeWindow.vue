<template>
  <div class="window-contents">
    <div class="window-header">타겟 모수 변경</div>
    <div class="window-body">
      <div class="target-mosu__change">
        <div class="infos">
          <i class="icon"></i>
          <div class="text">
            변경 타겟 모수를 입력하고, [적용]을 누르면 상세 조건(제한/제외)
            화면으로 이동되니 주의해 주세요.
            <strong
              >상세 조건(제외/제한) 설정 화면으로 이동되어 모수 체크 및 타겟
              추천이 다시 실행됩니다.</strong
            >
          </div>
        </div>
        <div class="target-inputs">
          <AppInput
            type="price"
            :readonly="true"
            v-model="currentTarget"
            labelName="현재 타겟 모수"
            placeholder="숫자만 입력"
          />
          <AppInput
            type="price"
            v-model="changeTarget"
            labelName="변경 타겟 모수"
            placeholder="숫자만 입력"
          />
        </div>
      </div>
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button
        class="btn-s red"
        @click="onConfirm"
        :disabled="changeTarget === ''"
      >
        적용
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';

const props = defineProps({
  targetValue: {
    type: [Number, String],
    default: '',
  },
});

const currentTarget = ref(props.targetValue);

const changeTarget = ref('');

const emit = defineEmits(['cancel', 'confirm']);
const onCancel = () => {
  emit('cancel');
};

const onConfirm = () => {
  emit('confirm', changeTarget.value);
  emit('cancel');
};
</script>
