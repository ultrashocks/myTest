<template>
  <div class="stage-items step2">
    <div class="item-row targeting-infos">
      <div class="item-row">
        <div class="title-item">타겟 정보</div>
        <div class="row">
          <AppInput
            v-model="step1Data.targetingName"
            labelName="타겟 이름"
            readonly
          />
        </div>
        <div class="row-flex mt18">
          <AppInput
            v-model="step1Data.customer"
            labelName="대상 고객"
            readonly
            style="flex: 0 0 100px"
          />
          <AppSelectCode
            labelName="마케팅 활동 코드"
            v-model="step1Data.marketing.code"
            @search="onSearch"
            @remove="onRemoveCms"
            placeholder="조회"
            :readonly="true"
            style="flex: 0 0 150px"
          />
          <AppInput
            type="text"
            labelName="마케팅 활동명"
            v-model="step1Data.marketing.name"
            :readonly="true"
            style="flex: 1"
          />
        </div>
      </div>

      <div class="item-row">
        <div class="title-item">타겟 업무</div>
        <div class="row-flex">
          <AppSelectBox
            labelName="서비스"
            :options="serviceOptions"
            v-model:optionsSelected="step2Data.service"
            readonly
          />
          <AppSelectBox
            labelName="상품유형"
            :options="productOptions"
            v-model:optionsSelected="step2Data.product"
            readonly
          />
          <AppSelectBox
            labelName="업무구분"
            :options="workOptions"
            v-model:optionsSelected="step2Data.work"
            readonly
          />
          <AppSelectBox
            labelName="업무상세"
            :options="workDetailOptions"
            v-model:optionsSelected="step2Data.workDetail"
            readonly
          />
        </div>
      </div>

      <div class="item-row col-2">
        <div class="item-col">
          <div class="title-item">타겟 채널</div>
          <div class="row-flex mt18">
            <AppSelectBox
              labelName="채널"
              :options="channelOptions"
              v-model:optionsSelected="step2Data.channel"
            />
            <AppSelectBox
              labelName="채널상세"
              :options="detailChannelOptions"
              v-model:optionsSelected="step2Data.detailChannel"
            />
          </div>
        </div>
        <div class="item-col">
          <div class="title-item">목표 타겟</div>
          <div class="row-flex mt18">
            <AppInput
              type="price"
              v-model="step2Data.targetNumber"
              labelName="목표 건수"
              placeholder="숫자만 입력"
            />
            <AppSelectBox
              labelName="대조군 건수"
              :options="controlGroupOptions"
              v-model:optionsSelected="step2Data.controlGroup"
            />
          </div>
        </div>
      </div>

      <div class="item-row">
        <div class="title-item">목표 최대 세그</div>
        <div class="row-col">
          <div class="select-label__comp">최대 세그 제한</div>
          <div class="seg-radios">
            <div class="custom-radio label">
              <label>
                <input
                  type="radio"
                  name="radioSelect"
                  v-model="step2Data.maxSeg.selected"
                  :value="1"
                />
                <i class="icon"></i>
                있음
              </label>
            </div>
            <AppInput
              type="price"
              v-model="step2Data.maxSeg.segNumber"
              placeholder="숫자만 입력"
              style="width: 100px"
              class="input-segmax"
              :disabled="step2Data.maxSeg.selected == 2"
            />
            <div class="custom-radio label">
              <label>
                <input
                  type="radio"
                  name="radioSelect"
                  v-model="step2Data.maxSeg.selected"
                  :value="2"
                />
                <i class="icon"></i>
                AI 추천 개수로 진행
              </label>
            </div>
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
  </div>
</template>

<script setup>
import AppInput from '@/components/ui/AppInput.vue';
import AppSelectCode from '@/components/ui/AppSelectCode.vue';
import AppWindow from '@/components/ui/AppWindow.vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import MarketingCodeWindow from '@/views/targeting/components/step1/components/MarketingCodeWindow.vue';
import { reactive, watch } from 'vue';
import { ref } from 'vue';

const step1Data = ref({
  targetingName: '모바일요금제 x VAS업셀',
  customer: '자사',
  marketing: {
    code: 'MK010',
    name: '모바일요금제 x VAS업셀',
  },
});

const step2Data = ref({
  service: { label: '인터넷', value: '인터넷' },
  product: { label: '요금제', value: '요금제' },
  work: { label: '상품변경', value: '상품변경' },
  workDetail: { label: '기가업셀', value: '기가업셀' },
  channel: { label: '고객센터', value: '고객센터' },
  detailChannel: { label: 'OB', value: 'ob' },
  targetNumber: 30000,
  controlGroup: { label: '10%', value: 10 },
  maxSeg: {
    selected: 2,
    segNumber: '',
  },
});

const marketingWindowView = ref(false);
const onSearch = () => {
  marketingWindowView.value = true;
};
const onRemoveCms = () => {
  step1Data.value.marketing.name = '';
};

const onWindowConfirm = value => {
  const { marketingCode, marketingName } = value;
  step1Data.value.marketing.code = marketingCode;
  step1Data.value.marketing.name = marketingName;
};

// 서비스
const serviceOptions = reactive([
  { label: '모바일', value: '모바일' },
  { label: '인터넷', value: '인터넷' },
  { label: 'TV', value: 'TV' },
  { label: '스카트홈', value: '스카트홈' },
  { label: '기타', value: '기타' },
  { label: '기타2', value: '기타2' },
]);
// 상품유형
const productOptions = reactive([
  { label: '요금제', value: '요금제' },
  { label: '부가서비스', value: '부가서비스' },
  { label: '단말', value: '단말' },
  { label: '기타', value: '기타' },
]);
// 업무구분
const workOptions = reactive([
  { label: '상품변경', value: '상품변경' },
  { label: '신규가입', value: '신규가입' },
  { label: '약정갱신', value: '약정갱신' },
  { label: '해지방어', value: '해지방어' },
  { label: '관계형성', value: '관계형성' },
  { label: '상품결합', value: '상품결합' },
  { label: '제휴', value: '제휴' },
]);
// 업무상세
const workDetailOptions = reactive([
  { label: '기가업셀', value: '기가업셀' },
  { label: '기타', value: '기타' },
]);
// 채널
const channelOptions = reactive([
  { label: '디지털', value: '디지털' },
  { label: '고객센터', value: '고객센터' },
  { label: '매장', value: '매장' },
]);
// 채널상세
const detailChannelOptions = reactive([
  { label: 'OB', value: 'ob' },
  { label: 'IB', value: 'ib' },
]);
// 대조군 건수
const controlGroupOptions = reactive([
  { label: '전체', value: 0 },
  { label: '10%', value: 10 },
  { label: '20%', value: 20 },
  { label: '30%', value: 30 },
]);

watch(step2Data.value.maxSeg, value => {
  if (value.selected == 2) {
    value.segNumber = '';
  }
});
</script>
