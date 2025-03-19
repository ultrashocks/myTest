<template>
  <StepStage>
    <div class="stage-area">
      <div class="stage-items step1">
        <div class="item-row">
          <div class="title-s">타겟 이름 입력</div>
          <div class="title">
            생성할 <strong class="red">타겟팅 이름</strong>을
            <strong>입력</strong>해 주세요.
          </div>
          <div class="duplication-check">
            <div class="duplication-input">
              <AppInput
                v-model="step1.targetingName"
                @inputEnter="onDuplicationCheck"
              />
              <button
                class="btn-duplication"
                :disabled="step1.targetingName.length < 1"
                @click="onDuplicationCheck"
              >
                중복확인
              </button>
            </div>
            <div
              class="result-input__msg"
              :class="checkMsg.state"
              v-if="checkMsg.state && step1.targetingName.length > 0"
            >
              {{ checkMsg.message }}
            </div>
          </div>
        </div>

        <div class="item-row">
          <div class="title-s">타겟 그룹 선택</div>
          <div class="title">
            <strong>타겟팅 대상</strong>
            <strong class="red">그룹</strong>을 선택해 주세요(선택).
          </div>
          <AppSelectBox
            :options="groupOptions"
            v-model:optionsSelected="step1.customerSelected"
            style="width: 385px; height: 36px"
          />
        </div>

        <div class="item-row" :class="{ 'disabled-corver': disabledCorver }">
          <div class="title-s">대상고객 선택</div>
          <div class="title">
            <strong class="red">어떤 고객</strong>을 <strong>대상</strong>으로
            진행할 예정이신가요?
          </div>
          <div class="btn-radios">
            <label>
              <input
                type="radio"
                name="customer"
                value="자사고객"
                v-model="step1.customer"
              />
              <span class="btn-radio">자사고객</span>
            </label>

            <label>
              <input
                type="radio"
                name="customer"
                value="타사고객"
                v-model="step1.customer"
              />
              <span class="btn-radio">타사고객</span>
            </label>
          </div>
        </div>

        <div class="item-row" :class="{ 'disabled-corver': disabledCorver }">
          <div class="title-s">입력 방식 선택</div>
          <div class="title">
            타겟팅을 위한 <strong class="red">기본 정보</strong>를
            <strong>어떻게</strong> 입력하시겠어요?
          </div>
          <div class="btn-radios">
            <label>
              <input
                type="radio"
                name="basicInfo"
                value="1"
                v-model="step1.basicInfo"
              />
              <span class="btn-radio"
                >단계별로 입력할게요<span class="txt-s">(추천)</span></span
              >
            </label>
            <label>
              <input
                type="radio"
                name="basicInfo"
                value="2"
                v-model="step1.basicInfo"
              />
              <span class="btn-radio">직접 입력할게요</span>
            </label>
          </div>
        </div>

        <div class="item-row" :class="{ 'disabled-corver': disabledCorver }">
          <div class="title-s">CMS 전송 선택</div>
          <div class="title">
            타겟을 <strong class="red">CMS</strong>로 <strong>전송</strong>할
            예정이신가요?
          </div>
          <div class="btn-radios">
            <label>
              <input type="radio" name="cms" value="1" v-model="step1.cms" />
              <span class="btn-radio">예</span>
            </label>
            <label>
              <input type="radio" name="cms" value="2" v-model="step1.cms" />
              <span class="btn-radio"
                >아니요<span class="txt-s">(타겟 저장에서 변경가능)</span></span
              >
            </label>
          </div>
          <div class="cms-use" v-if="step1.cms == 1">
            <AppSelectCode
              style="width: 175px"
              labelName="마케팅 활동 코드"
              v-model="step1.marketing.code"
              @search="onSearch"
              @remove="onRemoveCms"
              placeholder="조회"
              :readonly="true"
            />
            <AppInput
              type="text"
              labelName="마케팅 활동명"
              v-model="step1.marketing.name"
              :readonly="true"
              style="flex: 1"
            />
          </div>
        </div>
      </div>
    </div>

    <AppWindow v-model:view="marketingWindowView" width="895px" height="600px">
      <MarketingCodeWindow
        @cancel="marketingWindowView = false"
        @confirm="onWindowConfirm"
      />
    </AppWindow>
  </StepStage>
</template>

<script setup>
import { ref, toRefs, reactive, watch } from 'vue';
import StepStage from '../StepStage.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import AppSelectCode from '@/components/ui/AppSelectCode.vue';
import AppWindow from '@/components/ui/AppWindow.vue';
import MarketingCodeWindow from './components/MarketingCodeWindow.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const { step1 } = toRefs(props.modelValue);
// step1.value = {
//     targetingName: '',
//     customerSelected: { label: '선택', value: 0 },
//     customer: '',
//     basicInfo: '',
//     cms: '',
//     marketing: {
//       code: '',
//       name: '',
//     },
//   },

//타겟팅 이름 중복확인 결과
const checkMsg = reactive({
  state: '',
  message: '',
});

const disabledCorver = ref(true);

const onDuplicationCheck = () => {
  // 타겟 이름 조회 실행

  // 실행후 결과값 처리
  if (step1.value.targetingName === '테스트') {
    checkMsg.message = '이미 사용 중인 타겟 이름입니다.';
    checkMsg.state = 'error';
  } else {
    checkMsg.message = '사용할 수 있는 타겟 이름입니다.';
    checkMsg.state = 'success';
  }

  if (checkMsg.state === 'success') disabledCorver.value = false;
};

// 타겟 그룹 선택
const groupOptions = reactive([
  { label: '선택', value: 0 },
  { label: '그룹1', value: 1 },
  { label: '그룹2', value: 2 },
]);

const onSearch = () => {
  console.log('코드 검색');
  marketingWindowView.value = true;
};
const onRemoveCms = () => {
  step1.value.marketing.name = '';
};

const isComplete = ref(false);
const isCompleteCheck = obj => {
  return Object.entries(obj).every(([key, value]) => {
    if (key === 'customerSelected') return true; // customerSelected 검사 제외
    if (key === 'marketing' && step1.value.cms == 2) return true; // cms가 2이면 marketing 검사 제외
    if (typeof value === 'object' && value !== null) {
      return isCompleteCheck(value);
    }
    return value !== '';
    // return value !== '' && value !== 0;
  });
};

const marketingWindowView = ref(false);
const onWindowConfirm = value => {
  const { marketingCode, marketingName } = value;
  console.log(marketingCode, marketingName);
  step1.value.marketing.code = marketingCode;
  step1.value.marketing.name = marketingName;
};

const emit = defineEmits(['stepComplete']);
watch(
  step1.value,
  () => {
    isComplete.value = isCompleteCheck(step1.value);
    emit('stepComplete', { step: 1, complete: isComplete.value });
    console.log('isComplete.value========', isComplete.value);
    if (isComplete.value) disabledCorver.value = false;
  },
  { immediate: true },
);
</script>
