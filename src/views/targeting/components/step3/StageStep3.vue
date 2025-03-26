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
                  style="flex: 0 0 150px"
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
                v-if="step3Data.success.id > 13"
              >
                상세
              </button>
            </div>
            <template v-if="step3Data.success.id > 13">
              <div class="row mt18">
                <AppInput
                  v-model="step3Data.success.detailStandard"
                  labelName="지표 상세 기준"
                  :readonly="true"
                />
              </div>
              <div class="row mt18">
                <div class="select-label__comp">같은 그룹 상품코드</div>
                <textarea
                  v-model="step3Data.success.detailStandard"
                  style="height: 177px"
                  :readonly="true"
                ></textarea>
              </div>
            </template>
            <template v-else>
              <div class="row mt18">
                <AppInput
                  v-model="step3Data.success.detailStandard"
                  labelName="지표 상세 기준 (선택)"
                />
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
                style="flex: 0 0 150px"
              />
              <AppInput
                type="text"
                labelName="지표기준"
                v-model="step3Data.assistance.standard"
                :readonly="true"
                style="flex: 1"
              />
            </div>
            <div class="row mt18">
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
          height="600px"
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
    detailStandard: '',
    prdCode: '',
  },
  assistance: {
    id: 0,
    name: '',
    standard: '',
    detailStandard: '',
    prdCode: '',
  },
});

// 지표명 검색창
const selectType = ref('');
const successWindowView = ref(true);
const onSuccessSearch = type => {
  successWindowView.value = true;
  selectType.value = type;
};
const onSuccessRemove = () => {
  step3Data.value.success.id = 0;
  step3Data.value.success.standard = '';
  step3Data.value.success.detailStandard = '';
  step3Data.value.success.prdCode = '';
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
  const { marketingCode, marketingName } = value;
  step3Data.value.assistance.name = marketingCode;
  step3Data.value.assistance.standard = marketingName;
};
</script>
