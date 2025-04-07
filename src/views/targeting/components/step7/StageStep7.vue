<template>
  <StepStage>
    <div class="stage-area">
      <div class="stage-items step7">
        <div class="item-row col-2">
          <div class="title-s">타겟 저장</div>
          <div class="title">
            <strong>타겟</strong>을 <strong class="red">CMS</strong>로
            보내시겠어요?
          </div>
          <div class="btn-radios">
            <label>
              <input
                type="radio"
                name="customer"
                value="1"
                v-model="selectedValue"
              />
              <span class="btn-radio">CMS로 보내기</span>
            </label>
            <label>
              <input
                type="radio"
                name="customer"
                value="2"
                v-model="selectedValue"
              />
              <span class="btn-radio">타겟 저장 후 종료</span>
            </label>
          </div>
        </div>

        <div class="item-row" v-if="selectedValue == 1">
          <div class="row-flex flex-1">
            <AppSelectCode
              labelName="캠페인 CODE"
              v-model="data.campainCode"
              @search="onSearch"
              @remove="onRemove"
              placeholder="조회"
              :readonly="true"
              style="flex: 0 0 164px"
            />
            <AppInput
              type="text"
              labelName="캠페인명"
              v-model="data.campainName"
              :readonly="true"
            />
          </div>
          <div class="row-flex flex-1 mt16">
            <AppInput
              type="text"
              labelName="마케팅 코드"
              v-model="data.marketingCode"
              :readonly="true"
              style="flex: 0 0 164px"
            />
            <AppInput
              type="text"
              labelName="마케팅 활동명"
              v-model="data.marketingName"
              :readonly="true"
            />
          </div>
          <div class="row-flex flex-1 mt16">
            <AppInput
              type="text"
              labelName="플로우차트 ID"
              v-model="data.flowchartId"
              :readonly="true"
              style="flex: 0 0 164px"
            />
            <AppInput
              type="text"
              labelName="플로우차트명"
              v-model="data.flowchartName"
              :readonly="true"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- CMS 캠페인 플로우차트 선택 -->
    <AppWindow
      v-model:view="campainCodeWindowView"
      width="895px"
      height="617px"
    >
      <CampainCodeWindow
        @cancel="campainCodeWindowView = false"
        @confirm="onWindowConfirm"
      />
    </AppWindow>
  </StepStage>
</template>

<script setup>
import { ref } from 'vue';
import StepStage from '../StepStage.vue';
import { reactive } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSelectCode from '@/components/ui/AppSelectCode.vue';
import AppWindow from '@/components/ui/AppWindow.vue';
import CampainCodeWindow from './components/CampainCodeWindow.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const selectedValue = ref('');

const campainCodeWindowView = ref(false);

const data = reactive({
  campainCode: '',
  campainName: '',
  marketingCode: '',
  marketingName: '',
  flowchartId: '',
  flowchartName: '',
});

const dataReset = () => {
  data.campainCode = '';
  data.campainName = '';
  data.marketingCode = '';
  data.marketingName = '';
  data.flowchartId = '';
  data.flowchartName = '';
};
const onSearch = () => {
  campainCodeWindowView.value = true;
};

const onRemove = () => {
  dataReset();
};

const onWindowConfirm = value => {
  const { campain, flow } = value;
  data.campainCode = campain.code;
  data.campainName = campain.name;
  data.flowchartId = flow.code;
  data.flowchartName = flow.name;
  data.marketingCode = 'MK010';
  data.marketingName = '모바일요금제xVAS업셀';
};
</script>
