<template>
  <StepStage>
    <div class="stage-area">
      <div class="stage-items step2">
        <div class="item-row targeting-infos">
          <div class="item-row">
            <div class="title-item">성공지표</div>
            <div class="row-flex flex-align-end">
              <div class="row-flex w410 flex-1">
                <AppSelectCode
                  labelName="지표명"
                  v-model="step3Data.success.name"
                  @search="onSuccessSearch('success')"
                  @remove="onSuccessRemove"
                  placeholder="조회"
                  :readonly="true"
                  style="flex: 0 0 205px"
                  v-tippy="{
                    content:
                      '지표명이 조회되었을 경우 툴팁 나옴<br>유효응답자 수 / 타겟 등록건수',
                    placement: 'bottom',
                    allowHTML: true,
                    offset: [0, -2],
                    arrow: false,
                  }"
                />
                <AppInput
                  type="text"
                  labelName="지표기준"
                  v-model="step3Data.success.standard"
                  :readonly="true"
                  style="flex: 1"
                />
              </div>
              <button
                class="btn-b black"
                @click="onDetailSearch"
                v-if="step3Data.success.id > 0 && step3Data.success.id < 15"
              >
                상세
              </button>
            </div>
            <template
              v-if="step3Data.success.id > 0 && step3Data.success.id < 15"
            >
              <div class="row mt16">
                <AppInput
                  v-model="step3Data.success.detailStandard"
                  labelName="지표 상세 기준"
                  :readonly="true"
                />
              </div>
              <div class="row mt16">
                <div class="select-label__comp">같은 그룹 상품코드</div>
                <textarea
                  v-model="step3Data.success.prdCode"
                  style="height: 177px"
                  :readonly="true"
                ></textarea>
              </div>
              <div class="row mt16">
                <AppInput
                  v-model="step3Data.success.targetValue"
                  labelName="목표값 (선택)"
                  placeholder="선택 입력 항목입니다."
                />
              </div>
            </template>
            <template v-else>
              <div class="row mt16 position relative">
                <AppInput
                  v-model="step3Data.success.detailStandard_select"
                  labelName="지표 상세 기준 (선택)"
                  placeholder="예시 : 10% 이상, 이전대비 5,000d원 이상(100자 이내)"
                />
                <button
                  class="btn-info position absolute"
                  v-tippy="{
                    content:
                      '업셀성공률의 경우 순액기준으로 성공을 관리합니다. <br>성공으로 보는 이전대비 순증금액을 기입해주세요.',
                    placement: 'right-start',
                    allowHTML: true,
                    maxWidth: 500,
                  }"
                >
                  <span>도움말</span>
                </button>
              </div>
            </template>
          </div>

          <div class="item-row">
            <div class="title-item">
              보조 지표<span class="title-s">(선택)</span>
            </div>
            <div class="row-flex w410 flex-1">
              <AppSelectCode
                labelName="지표명"
                v-model="step3Data.assistance.name"
                @search="onSuccessSearch('assistance')"
                @remove="onAssistanceRemove"
                placeholder="조회"
                :readonly="true"
                style="flex: 0 0 205px"
                v-tippy="{
                  content:
                    '지표명이 조회되었을 경우 툴팁 나옴<br>유효응답자 수 / 타겟 등록건수',
                  placement: 'bottom',
                  allowHTML: true,
                  offset: [0, -2],
                  arrow: false,
                }"
              />
              <AppInput
                type="text"
                labelName="지표기준"
                v-model="step3Data.assistance.standard"
                :readonly="true"
                style="flex: 1"
              />
            </div>
            <div class="row mt16">
              <AppInput
                v-model="step3Data.assistance.detailStandard"
                labelName="지표 상세 기준"
              />
            </div>
          </div>
        </div>
        <AppWindow v-model:view="successWindowView" width="895px" height="auto">
          <IndicatorNameWindow
            @cancel="successWindowView = false"
            @confirm="onSuccessConfirm"
          />
        </AppWindow>

        <AppWindow
          v-model:view="assistanceWindowView"
          width="895px"
          height="676px"
        >
          <IndicatorNameDetailWindow
            @cancel="assistanceWindowView = false"
            @confirm="onAssistanceConfirm"
          />
        </AppWindow>
      </div>
    </div>
  </StepStage>
</template>

<script setup>
import AppInput from '@/components/ui/AppInput.vue';
import AppSelectCode from '@/components/ui/AppSelectCode.vue';
import AppWindow from '@/components/ui/AppWindow.vue';
import IndicatorNameWindow from '@/views/targeting/components/step3/components/IndicatorNameWindow.vue';
import IndicatorNameDetailWindow from '@/views/targeting/components/step3/components/IndicatorNameDetailWindow.vue';
import { ref } from 'vue';
import StepStage from '../StepStage.vue';
import { useSpinner } from '@/composables/spinner';
import { directive as vTippy } from 'vue-tippy';

const { setSpinnerStatus } = useSpinner();

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

// const { step3 } = toRefs(props.modelValue);

const step3Data = ref({
  success: {
    id: 0,
    name: '',
    standard: '',
    detailStandard_select: '',
    detailStandard: '',
    prdCode: '',
    targetValue: '',
  },
  assistance: {
    id: 0,
    name: '',
    standard: '',
    detailStandard_select: '',
    detailStandard: '',
    prdCode: '',
  },
});

// 지표명 검색창
const selectType = ref('');
const successWindowView = ref(false);
const onSuccessSearch = type => {
  successWindowView.value = true;
  selectType.value = type;
};
const onSuccessRemove = () => {
  step3Data.value.success.id = 0;
  step3Data.value.success.standard = '';
  step3Data.value.success.detailStandard_select = '';
  step3Data.value.success.detailStandard = '';
  step3Data.value.success.prdCode = '';
  step3Data.value.success.targetValue = '';
};
const onAssistanceRemove = () => {
  step3Data.value.assistance.id = 0;
  step3Data.value.assistance.standard = '';
  step3Data.value.assistance.detailStandard = '';
  step3Data.value.assistance.prdCode = '';
};
const onSuccessConfirm = value => {
  const { id, name, standard } = value;
  if (selectType.value == 'success') {
    step3Data.value.success.id = Number(id);
    step3Data.value.success.name = name;
    step3Data.value.success.standard = standard;
  } else {
    step3Data.value.assistance.id = Number(id);
    step3Data.value.assistance.name = name;
    step3Data.value.assistance.standard = standard;
  }
  selectType.value = '';
};

// 상세창
const assistanceWindowView = ref(false);
const onDetailSearch = () => {
  assistanceWindowView.value = true;
};

const onAssistanceConfirm = value => {
  const { prdCode, prdName, group } = value;
  step3Data.value.success.detailStandard = `${prdCode}|${prdName}|${group}`;
  step3Data.value.success.prdCode =
    'LPZ0002555 (리얼글래스) 5G 시그니처, LPZ0002557 (갤럭시 워치) 5G 시그니처, LPZ0002558 (롯데카드제휴) 5G 시그니처, LPZ0002555 (리얼글래스) 5G 시그니처, LPZ0002557 (갤럭시 워치) 5G 시그니처, LPZ0002558 (롯데카드제휴) 5G 시그니처';
};

// Loader 테스트
const loaderView = () => {
  //loader 보이게
  setSpinnerStatus(true);
  //loader 사라지게(2초후 사라지게 임시 setTimeout 사용)
  setTimeout(() => {
    setSpinnerStatus(false);
  }, 2000);
};

loaderView();
</script>
