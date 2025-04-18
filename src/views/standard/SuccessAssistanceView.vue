<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view">
          <div class="stage-area">
            <div class="stage-items step2 content-inputs">
              <div class="item-row input-rows">
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
                            v-model="data.indicatorType"
                            :value="1"
                          />
                          <i class="icon"></i>
                          있음
                        </label>
                      </div>
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="radioSelect"
                            v-model="data.indicatorType"
                            :value="2"
                          />
                          <i class="icon"></i>
                          AI 추천 개수로 진행
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="item-row">
                  <div class="title-item">
                    보조 지표<span class="title-s">(선택)</span>
                  </div>
                  <div class="row-flex w410 flex-1">
                    <AppInput
                      type="text"
                      labelName="지표기준"
                      :readonly="true"
                      style="flex: 1"
                    />
                  </div>
                  <div class="row mt16">
                    <AppInput labelName="지표 상세 기준" />
                  </div>
                </div>

                <div class="item-row col-2">
                  <div class="item-col">
                    <div class="title-item">타겟 채널</div>
                    <div class="row-flex mt16">
                      <AppInput labelName="지표 상세 기준" />
                    </div>
                  </div>
                  <div class="item-col">
                    <div class="title-item">목표 타겟</div>
                    <div class="row-flex mt16">
                      <AppInput labelName="지표 상세 기준" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-btns__controls footer-button-box">
            <div class="btn-l"><button @click="onCancel">취소</button></div>
            <div class="btn-r">
              <button class="emph" @click="onSave">저장</button>
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

import AppInput from '@/components/ui/AppInput.vue';
import { ref } from 'vue';

const data = ref({
  indicatorType: 1,
  use: '',
  indicatorCode: '',
  indicatorName: '',
  productOffer: '',
  indicatorStandard: '',
  indicatorExplain: '',
});

const onSave = () => {
  console.log('저장');
};

const onCancel = () => {
  console.log('취소');
};
</script>
