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
                </div>

                <div class="item-row">
                  <div class="title-item">세그정보</div>
                  <div class="row-flex flex-1">
                    <AppInput
                      type="text"
                      labelName="세그코드"
                      :readonly="true"
                      v-model="data.segCode"
                      placeholder="생성시 자동 부여"
                      style="flex: 0 0 205px"
                    />
                    <AppInput
                      type="text"
                      labelName="세그명"
                      placeholder="최대 20자 이내"
                      :maxLength="20"
                      v-model="data.segName"
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
                      labelName="세그그룹"
                      :options="segGroupOptions"
                      v-model:optionsSelected="data.segGroup"
                      style="flex: 0 0 205px"
                    />
                  </div>
                  <div class="row-flex flex-1 mt16">
                    <AppSelectBox
                      labelName="대상 테이블"
                      :options="targetTableOptions"
                      v-model:optionsSelected="data.targetTable"
                      style="flex: 0 0 205px"
                    />
                  </div>
                  <div class="row-flex flex-1 mt16">
                    <AppSelectCode
                      labelName="컬럼 이름"
                      v-model="data.columName.code"
                      @search="onColumNameSearch"
                      @remove="onColumNameRemove"
                      placeholder="조회"
                      :readonly="true"
                      style="flex: 0 0 205px"
                    />
                  </div>
                  <div class="row mt16">
                    <div class="select-label__comp">세그 설명</div>
                    <textarea
                      placeholder="최대 200자 이내"
                      :maxLength="200"
                      style="height: 100px"
                      v-model="data.segExplain"
                    ></textarea>
                  </div>
                </div>
                <div class="item-row mb0 seg-inputs__wrap">
                  <div class="title-item">상세 세그 정보</div>
                  <div class="row-flex seg-inputs__header">
                    <div class="select-label__comp">상세 세그명</div>
                    <button class="btn-common add" @click="onAddSegName">
                      추가<i></i>
                    </button>
                  </div>
                  <div class="row">
                    <div class="seg-name__list">
                      <ul>
                        <li
                          v-for="item in data.segInfos.segName"
                          :key="item.id"
                        >
                          <AppInput
                            type="text"
                            placeholder="최대 20자 이내"
                            :maxLength="20"
                            v-model="item.name"
                            style="flex: 1"
                          />
                          <div class="order-control">
                            <button
                              class="btn-common up"
                              @click="onMoveUp(item.id)"
                            >
                              <i class="icon"></i></button
                            ><button
                              class="btn-common down"
                              @click="onMoveDown(item.id)"
                            >
                              <i class="icon"></i>
                            </button>
                          </div>
                          <button
                            class="btn-delete"
                            @click="onDeleteSegName(item.id)"
                            :disabled="data.segInfos.segName.length === 1"
                          >
                            삭제
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="row mt16">
                    <div class="row-flex seg-inputs__header">
                      <div class="select-label__comp">SQL</div>
                      <button class="btn-s red">SQL 검증</button>
                    </div>
                    <textarea
                      style="height: 200px"
                      v-model="data.segInfos.sql"
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

import AppInput from '@/components/ui/AppInput.vue';
import AppSelectCode from '@/components/ui/AppSelectCode.vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import { computed, ref, reactive } from 'vue';
import { useSlider } from '@/composables/slider';
import { randomKey } from '@/utils/utils';

const { setSliderStatus } = useSlider();

const data = ref({
  use: '',
  segCode: '',
  segName: '',
  standard: 'id',
  segGroup: { label: '선택', value: '' },
  targetTable: { label: '선택', value: '' },
  columName: {
    code: '',
    name: '',
  },
  segExplain: '',
  segInfos: {
    segName: [
      {
        id: randomKey(),
        name: '',
      },
    ],
    sql: '',
  },
});

//세그 그룹
const segGroupOptions = reactive([
  { label: '선택', value: '' },
  { label: '선택1', value: '1' },
  { label: '선택2', value: '2' },
  { label: '선택3', value: '3' },
]);

//대상 테이블
const targetTableOptions = reactive([
  { label: '선택', value: '' },
  { label: '선택1', value: '1' },
  { label: '선택2', value: '2' },
  { label: '선택3', value: '3' },
]);

const onColumNameSearch = () => {
  console.log('컬럼 이름 검색');
};

const onColumNameRemove = () => {
  console.log('컬럼 이름 삭제');
};

const onDeleteSegName = id => {
  // if (data.value.segInfos.segName.length === 1) return;
  data.value.segInfos.segName = data.value.segInfos.segName.filter(
    item => item.id !== id,
  );
};

const onAddSegName = () => {
  data.value.segInfos.segName.push({
    id: randomKey(),
    name: '',
  });
};

const onMoveUp = id => {
  console.log('위로 이동');
  const index = data.value.segInfos.segName.findIndex(item => item.id === id);
  if (index > 0) {
    const temp = data.value.segInfos.segName[index - 1];
    data.value.segInfos.segName[index - 1] = data.value.segInfos.segName[index];
    data.value.segInfos.segName[index] = temp;
  }
};

const onMoveDown = id => {
  console.log('아래로 이동');
  const index = data.value.segInfos.segName.findIndex(item => item.id === id);
  if (index < data.value.segInfos.segName.length - 1) {
    const temp = data.value.segInfos.segName[index + 1];
    data.value.segInfos.segName[index + 1] = data.value.segInfos.segName[index];
    data.value.segInfos.segName[index] = temp;
  }
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

const isFormValid = computed(() => {
  return (
    // data.value.segCode !== '' &&
    data.value.segName !== '' &&
    data.value.standard !== '' &&
    data.value.segGroup.value !== '' &&
    data.value.targetTable.value !== '' &&
    // data.value.columName.value !== '' &&
    data.value.segExplain !== '' &&
    data.value.segInfos.segName.every(item => item.name !== '') &&
    data.value.segInfos.sql !== ''
  );
});
</script>
