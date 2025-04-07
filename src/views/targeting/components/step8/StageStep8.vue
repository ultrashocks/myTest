<template>
  <StepStage>
    <div class="stage-area">
      <div class="stage-items step8">
        <div class="item-row">
          <div class="title-s">실행 기간</div>
          <div class="title">
            <strong>타겟팅</strong> <strong class="red">실행 기간</strong>을
            설정해 주세요<span class="text-s">(선택)</span>
          </div>
          <AppDateTimeFromToPicker
            labelName="실행기간(시작일 ~ 종료일)"
            v-model:fromDate="data.date.from"
            v-model:toDate="data.date.to"
            style="width: 225px"
          />
        </div>

        <div class="item-row">
          <div class="title-s">실행 주기</div>
          <div class="title">
            <strong>타겟팅</strong> <strong class="red">실행 주기</strong>를
            설정해 주세요<span class="text-s">(선택)</span>
          </div>
          <div class="btn-radios">
            <label>
              <input
                type="radio"
                name="term"
                value="month"
                v-model="data.term"
              />
              <span class="btn-radio">매월</span>
            </label>
            <label>
              <input
                type="radio"
                name="term"
                value="week"
                v-model="data.term"
              />
              <span class="btn-radio">매주</span>
            </label>
            <label>
              <input type="radio" name="term" value="day" v-model="data.term" />
              <span class="btn-radio">매일</span>
            </label>
            <label>
              <input
                type="radio"
                name="term"
                value="once"
                v-model="data.term"
              />
              <span class="btn-radio">한번만</span>
            </label>
          </div>
          <div class="row-flex mt16">
            <AppSelectBox
              labelName="주기 상세"
              :options="cycleDetailsOptions"
              v-model:optionsSelected="data.cycleDetails"
              style="flex: 0 0 164px"
            />
            <AppTimePicker
              labelName="타겟팅 시점"
              v-model:time="data.time"
              style="width: 164px"
            />
          </div>
        </div>

        <div class="item-row mb30">
          <div class="title-s">타겟 ID 연동</div>
          <div class="title">
            <strong>타겟팅 시점</strong>을 연동할
            <strong class="red">타겟 ID</strong>가 있나요?<span class="text-s"
              >(선택)</span
            >
          </div>
          <div class="btn-radios">
            <label>
              <input
                type="radio"
                name="cms"
                value="1"
                v-model="data.targetIdUse"
              />
              <span class="btn-radio">있어요</span>
            </label>
            <label>
              <input
                type="radio"
                name="cms"
                value="0"
                v-model="data.targetIdUse"
              />
              <span class="btn-radio">없어요</span>
            </label>
          </div>
          <template v-if="data.targetIdUse == 1">
            <div class="row-flex mt16">
              <AppSelectCode
                style="flex: 0 0 164px"
                labelName="연동 타겟 ID"
                v-model="data.target.code"
                @search="onSearch"
                @remove="onRemoveCms"
                placeholder="조회"
                :readonly="true"
              />
              <AppInput
                type="text"
                labelName="타겟명"
                v-model="data.target.name"
                :readonly="true"
                style="flex: 1"
              />
            </div>
            <div class="row-flex mt16">
              <AppInput
                type="text"
                labelName="연동 방식"
                v-model="data.linkMethod"
                :readonly="true"
                style="flex: 0 0 164px"
              />
              <AppSelectBox
                labelName="연동 시점"
                :options="linkPointOptions"
                direction="up"
                v-model:optionsSelected="data.linkPoint"
                style="flex: 0 0 164px"
              />
            </div>
          </template>
        </div>
      </div>
    </div>

    <AppWindow
      v-model:view="LinkedTargetWindowView"
      width="895px"
      height="617px"
    >
      <LinkedTargetWindow
        @cancel="LinkedTargetWindowView = false"
        @confirm="onWindowConfirm"
      />
    </AppWindow>
  </StepStage>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import StepStage from '../StepStage.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import AppSelectCode from '@/components/ui/AppSelectCode.vue';
import AppWindow from '@/components/ui/AppWindow.vue';
import LinkedTargetWindow from './components/LinkedTargetWindow.vue';
import AppDateTimeFromToPicker from '@/components/calendar/AppDateTimeFromToPicker.vue';
import AppTimePicker from '@/components/calendar/AppTimePicker.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

// 주기 상세

const cycleDetailsOptions = reactive([
  { label: '실행 주기 선택', value: 0 },
  { label: '1일', value: 1 },
  { label: '2일', value: 2 },
  { label: '3일', value: 3 },
  { label: '4일', value: 4 },
]);
// 연동 시점
const linkPointOptions = reactive([
  { label: '10분 후', value: 10 },
  { label: '20분 후', value: 20 },
  { label: '30분 후', value: 30 },
  { label: '40분 후', value: 40 },
  { label: '50분 후', value: 50 },
  { label: '60분 후', value: 60 },
]);

const data = reactive({
  date: {
    from: new Date(),
    to: new Date(),
  },
  term: '',
  cycleDetails: { label: '실행 주기 선택', value: 0 },
  time: {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  },
  targetIdUse: '',
  target: {
    code: '',
    name: '',
  },
  linkMethod: '연동 타겟 완료 후',
  linkPoint: { label: '30분 후', value: 30 },
});

const onSearch = () => {
  console.log('코드 검색');
  LinkedTargetWindowView.value = true;
};
const onRemoveCms = () => {
  data.target.name = '';
};

const LinkedTargetWindowView = ref(false);
const onWindowConfirm = value => {
  const { targetId, targetName } = value;
  data.target.code = targetId;
  data.target.name = targetName;
};

watch(
  () => data.targetIdUse,
  () => {
    console.log('변경');
    if (data.targetIdUse == 1) {
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        setTimeout(() => {
          contentArea.scrollTo({
            top: contentArea.scrollHeight,
            behavior: 'smooth',
          });
        });
      }
    }
  },
);
</script>
