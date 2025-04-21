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
                    <div class="title-item">제외/제한조건 구분</div>
                    <div class="seg-radios">
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="excludeLimitRadio"
                            v-model="data.excludeLimit"
                            :value="1"
                          />
                          <i class="icon"></i>
                          제외조건
                        </label>
                      </div>
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="excludeLimitRadio"
                            v-model="data.excludeLimit"
                            :value="2"
                          />
                          <i class="icon"></i>
                          제한조건
                        </label>
                      </div>
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="excludeLimitRadio"
                            v-model="data.excludeLimit"
                            :value="3"
                          />
                          <i class="icon"></i>
                          공용
                        </label>
                      </div>
                    </div>
                    <!-- 제외/제한조건 수정에서 제외.제한조건 구분 read only 예시-->
                    <!-- <div class="seg-radios">
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="excludeLimitRadio"
                            v-model="data.excludeLimit"
                            :value="1"
                            :checked="true"
                            :readonly="true"
                          />
                          <i class="icon readonly"></i>
                          제외조건
                        </label>
                      </div>
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="excludeLimitRadio"
                            v-model="data.excludeLimit"
                            :value="2"
                            :disabled="true"
                          />
                          <i class="icon"></i>
                          제한조건
                        </label>
                      </div>
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="excludeLimitRadio"
                            v-model="data.excludeLimit"
                            :value="3"
                            :disabled="true"
                          />
                          <i class="icon"></i>
                          공용
                        </label>
                      </div>
                    </div> -->
                  </div>
                  <div class="item-col">
                    <div class="title-item">사용 여부 (사용자 화면 노출)</div>
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
                  <!-- 화면설계 ver 1.4 삭제
                  <div class="item-col">
                    <div class="title-item">기본 여부</div>
                    <div class="seg-radios">
                      <div class="custom-radio label">
                        <label>
                          <input
                            type="radio"
                            name="basicRadio"
                            v-model="data.basic"
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
                            name="basicRadio"
                            v-model="data.basic"
                            :value="false"
                          />
                          <i class="icon"></i>
                          미사용
                        </label>
                      </div>
                    </div>
                  </div> -->
                </div>

                <div class="item-row mb0">
                  <div class="title-item">조건정보</div>
                  <div class="row-flex flex-1">
                    <AppInput
                      type="text"
                      labelName="조건코드"
                      :readonly="true"
                      v-model="data.conditionCode"
                      placeholder="생성 시 자동 부여"
                      style="flex: 0 0 205px"
                    />
                    <AppInput
                      type="text"
                      labelName="조건명"
                      placeholder="최대 50자 이내"
                      :maxLength="50"
                      v-model="data.conditionName"
                      style="flex: 1"
                    />
                  </div>
                  <div class="row-flex flex-1 mt16">
                    <div class="item-col" style="flex: 0 0 205px">
                      <div class="select-label__comp">기준</div>
                      <div class="seg-radios">
                        <div class="custom-radio label">
                          <label>
                            <input
                              type="radio"
                              name="productOfferRadio"
                              v-model="data.standard"
                              :value="'id'"
                            />
                            <i class="icon"></i>
                            고객ID
                          </label>
                        </div>
                        <div class="custom-radio label">
                          <label>
                            <input
                              type="radio"
                              name="productOfferRadio"
                              v-model="data.standard"
                              :value="'number'"
                            />
                            <i class="icon"></i>
                            가입번호
                          </label>
                        </div>
                      </div>
                    </div>
                    <AppSelectBox
                      labelName="조건그룹"
                      :options="conditionGroupOptions"
                      v-model:optionsSelected="data.conditionGroup"
                      style="flex: 0 0 537px"
                    />
                  </div>
                  <div class="row-flex flex-1 mt16">
                    <AppSelectCode
                      labelName="대상 테이블"
                      v-model="data.targetTable.code"
                      @search="onTargetTableSearch"
                      @remove="onTargetTableRemove"
                      placeholder="조회"
                      :readonly="true"
                      style="flex: 0 0 750px"
                    />
                  </div>
                  <!-- 대상 테이블 선택 전 : :disabled="true" :readonly="false" -->
                  <!-- 대상 테이블 선택 후 : :disabled="false" :readonly="true" -->
                  <div class="row-flex flex-1 mt16">
                    <AppSelectCode
                      labelName="컬럼 이름"
                      v-model="data.columName.code"
                      @search="onColumNameSearch"
                      @remove="onColumNameRemove"
                      placeholder="대상 테이블 선택 후 조회"
                      :disabled="true"
                      :readonly="false"
                      style="flex: 0 0 537px"
                    />
                    <AppSelectBox
                      labelName="연산자 선택"
                      :options="coperatorOptions"
                      v-model:optionsSelected="data.operator"
                      style="flex: 0 0 205px"
                    />
                  </div>
                  <div class="row mt16">
                    <AppInput
                      type="text"
                      labelName="조건값"
                      placeholder="조건 값이 여러 개이면, 콤바(,)로 구분"
                      :maxLength="20"
                      v-model="data.conditionValue"
                    />
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

import AppInput from '@/components/ui/AppInput.vue';
import AppSelectCode from '@/components/ui/AppSelectCode.vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import { computed, ref, reactive } from 'vue';
import { useSlider } from '@/composables/slider';

const { setSliderStatus } = useSlider();

const data = ref({
  excludeLimit: '',
  use: true,
  basic: '',
  conditionCode: '',
  conditionName: '',
  standard: '',
  conditionGroup: { label: '선택', value: '' },
  targetTable: {
    code: '',
    name: '',
  },
  columName: {
    code: '',
    name: '',
  },
  operator: { label: '선택', value: '' },
  conditionValue: '',
});

//조건 그룹
const conditionGroupOptions = reactive([
  { label: '선택', value: '' },
  { label: '선택1', value: '1' },
  { label: '선택2', value: '2' },
  { label: '선택3', value: '3' },
]);

//연산자 선택
const coperatorOptions = reactive([
  { label: '선택', value: '' },
  { label: '선택1', value: '1' },
  { label: '선택2', value: '2' },
  { label: '선택3', value: '3' },
]);

const isFormValid = computed(() => {
  return (
    data.value.excludeLimit !== '' &&
    data.value.conditionName !== '' &&
    data.value.basic !== '' &&
    data.value.conditionName !== '' &&
    data.value.standard !== '' &&
    data.value.conditionGroup.value !== '' &&
    // data.value.targetTable.value !== '' &&
    // data.value.columName.value !== '' &&
    data.value.conditionGroup.value !== '' &&
    data.value.conditionValue !== ''
  );
});

const onTargetTableSearch = () => {
  console.log('대상 테이블 검색');
};

const onTargetTableRemove = () => {
  console.log('대상 테이블 삭제');
};

const onColumNameSearch = () => {
  console.log('컬럼 이름 검색');
};

const onColumNameRemove = () => {
  console.log('컬럼 이름 삭제');
};

const onSave = () => {
  console.log('저장');
  setSliderStatus({
    view: true,
    message: '저장장되었습니다.',
  });
};

const onCancel = () => {
  console.log('취소');
};
</script>
