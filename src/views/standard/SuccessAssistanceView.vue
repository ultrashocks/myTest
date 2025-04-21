<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view">
          <div class="stage-area">
            <div class="stage-items content-inputs">
              <div class="item-row input-rows">
                <div class="item-row flex">
                  <div class="item-col">
                    <div class="title-item">채널구분</div>
                    <div class="seg-radios">
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="indicatorRadio"
                            v-model="data.indicatorType"
                            :value="1"
                          />
                          <i class="icon"></i>
                          디지털
                        </label>
                      </div>
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="indicatorRadio"
                            v-model="data.indicatorType"
                            :value="2"
                          />
                          <i class="icon"></i>
                          고객센터
                        </label>
                      </div>
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="indicatorRadio"
                            v-model="data.indicatorType"
                            :value="3"
                          />
                          <i class="icon"></i>
                          매장
                        </label>
                      </div>
                    </div>
                    <!-- 성공/보조지표 수정에서 채널 구분 read only 예시-->
                    <!-- <div class="seg-radios">
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="indicatorRadio"
                            v-model="data.indicatorType"
                            :value="1"
                            :checked="true"
                            :readonly="true"
                          />
                          <i class="icon readonly"></i>
                          디지털
                        </label>
                      </div>
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="indicatorRadio"
                            v-model="data.indicatorType"
                            :value="2"
                            :disabled="true"
                          />
                          <i class="icon"></i>
                          고객센터
                        </label>
                      </div>
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="indicatorRadio"
                            v-model="data.indicatorType"
                            :value="3"
                            :disabled="true"
                          />
                          <i class="icon"></i>
                          매장
                        </label>
                      </div>
                    </div> -->
                  </div>
                  <div class="item-col">
                    <div class="title-item">사용 여부(사용자 화면 노출)</div>
                    <div class="seg-radios">
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="useRadio"
                            v-model="data.use"
                            :value="true"
                          />
                          <i class="icon"></i>
                          사용
                        </label>
                      </div>
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="useRadio"
                            v-model="data.use"
                            :value="false"
                          />
                          <i class="icon"></i>
                          미사용
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="item-row mb0">
                  <div class="title-item">지표정보</div>
                  <div class="row-flex flex-1">
                    <AppInput
                      type="text"
                      labelName="지표코드"
                      :readonly="true"
                      v-model="data.indicatorCode"
                      placeholder="생성 시 자동 부여"
                      style="flex: 0 0 205px"
                    />
                    <AppInput
                      type="text"
                      labelName="지표명"
                      placeholder="최대 20자 이내"
                      :maxLength="20"
                      v-model="data.indicatorName"
                      style="flex: 1"
                    />
                  </div>
                  <div class="row-flex flex-1 mt16">
                    <div class="item-col" style="flex: 0 0 205px">
                      <div class="select-label__comp">상품 상세제공 여부</div>
                      <div class="seg-radios">
                        <div class="custom-radio label">
                          <label>
                            <input
                              type="radio"
                              name="productOfferRadio"
                              v-model="data.productOffer"
                              :value="true"
                            />
                            <i class="icon"></i>
                            제공
                          </label>
                        </div>
                        <div class="custom-radio label">
                          <label>
                            <input
                              type="radio"
                              name="productOfferRadio"
                              v-model="data.productOffer"
                              :value="false"
                            />
                            <i class="icon"></i>
                            미제공
                          </label>
                        </div>
                      </div>
                    </div>
                    <AppInput
                      type="text"
                      labelName="지표기준"
                      placeholder="최대 20자 이내"
                      :maxLength="20"
                      style="flex: 1"
                      v-model="data.indicatorStandard"
                    />
                  </div>

                  <div class="row mt16">
                    <div class="select-label__comp">
                      지표 설명(사용자 툴팁 내용)
                    </div>
                    <textarea
                      placeholder="최대 400자 이내"
                      :maxLength="400"
                      style="height: 100px"
                      v-model="data.indicatorExplain"
                    ></textarea>
                  </div>
                </div>
                <div class="bottom-btns__controls footer-button-box">
                  <div class="btn-l">
                    <button @click="onCancel">취소</button>
                  </div>
                  <div class="btn-r">
                    <button
                      class="emph"
                      @click="onSave"
                      :disabled="!isFormValid"
                    >
                      저장
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);
import { useAlert } from '@/composables/alert';

import AppInput from '@/components/ui/AppInput.vue';
import { computed, ref } from 'vue';

const data = ref({
  indicatorType: '',
  use: true,
  indicatorCode: '',
  indicatorName: '',
  productOffer: false,
  indicatorStandard: '',
  indicatorExplain: '',
});

// Alert창
const { setAlertStatus } = useAlert();
const alertView = () => {
  setAlertStatus({
    view: true,
    message: `{유치성공율_금액기준}/{상품(모바일요금제)}<br>지표가 이미 등록되어있습니다.<br>지표명 또는 지표기준을 변경해 주세요.`,
  });
};

const isFormValid = computed(() => {
  return (
    data.value.indicatorType !== '' &&
    data.value.indicatorName !== '' &&
    data.value.indicatorStandard !== '' &&
    data.value.indicatorExplain !== ''
  );
});

const onSave = () => {
  console.log('저장');
  alertView();
};

const onCancel = () => {
  console.log('취소');
};
</script>
