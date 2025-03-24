<template>
  <section class="targeting-side">
    <span class="btn-side" @click="$emit('sideShowHide')"
      ><i class="icon"></i
    ></span>
    <div class="side-wrap" v-if="sideShow">
      <div class="side-contents">
        <div class="side-top">
          <div class="title-row">
            <div
              class="title"
              @mouseover="checkEllipsis($event)"
              v-tippy="{
                content: isEll ? sideTitle : '',
                placement: 'bottom',
              }"
            >
              {{ sideTitle }}
            </div>
          </div>
          <div class="infos">
            <div class="target">대상고객</div>
            <div class="customer">자사</div>
          </div>
        </div>
        <div class="side-bottom">
          <div class="step-navi">
            <ul class="lv1">
              <li>
                <div class="lv1-info" :class="{ active: naviControl.step1 }">
                  <div class="title">기본정보</div>
                  <span
                    class="btn-show"
                    @click="naviControl.step1 = !naviControl.step1"
                    ><i class="icon"></i
                  ></span>
                </div>
                <ul class="lv2">
                  <li>
                    <button
                      class="lv2-info"
                      :class="{
                        active: selectStep == 2 && selectStep2Scene == 1,
                      }"
                      @click="onMoveStep2(1)"
                    >
                      <span class="label">서비스</span>
                      <span class="info">인터넷</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="lv2-info"
                      :class="{
                        active: selectStep == 2 && selectStep2Scene == 2,
                      }"
                      @click="onMoveStep2(2)"
                    >
                      <span class="label">상품유형</span>
                      <span class="info">요금제</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="lv2-info"
                      :class="{
                        active: selectStep == 2 && selectStep2Scene == 3,
                      }"
                      @click="onMoveStep2(3)"
                    >
                      <span class="label">업무구분</span>
                      <span class="info">상품변경</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="lv2-info"
                      :class="{
                        active: selectStep == 2 && selectStep2Scene == 4,
                      }"
                      @click="onMoveStep2(4)"
                    >
                      <span class="label">업무상세</span>
                      <span class="info">업무상세</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="lv2-info"
                      :class="{
                        active: selectStep == 2 && selectStep2Scene == 5,
                      }"
                      @click="onMoveStep2(5)"
                    >
                      <span class="label">채널</span>
                      <span class="info">고객센터</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="lv2-info"
                      :class="{
                        active: selectStep == 2 && selectStep2Scene == 6,
                      }"
                      @click="onMoveStep2(6)"
                    >
                      <span class="label">채널상세</span>
                      <span class="info">OB</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="lv2-info row"
                      :class="{
                        active: selectStep == 2 && selectStep2Scene == 7,
                      }"
                      @click="onMoveStep2(7)"
                    >
                      <div class="row">
                        <span class="label">목표타겟</span>
                        <span class="info">있음</span>
                      </div>
                      <div class="row">
                        <span class="label">타겟건수</span>
                        <span class="info"></span>
                      </div>
                      <div class="row">
                        <span class="label">대조군 비율</span>
                        <span class="info"></span>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      class="lv2-info row"
                      :disabled="false"
                      :class="{
                        active: selectStep == 2 && selectStep2Scene == 8,
                      }"
                      @click="onMoveStep2(8)"
                    >
                      <div class="row">
                        <span class="label">목표 최대 세그</span>
                        <span class="info"></span>
                      </div>
                      <div class="row">
                        <span class="label">최대 세그 수</span>
                        <span class="info"></span>
                      </div>
                    </button>
                  </li>
                </ul>
              </li>
              <!-- <li>
                <div class="lv1-info" :class="{ active: naviControl.step2 }">
                  <div class="title">성공기준</div>
                  <span
                    class="btn-show"
                    @click="naviControl.step2 = !naviControl.step2"
                    ><i class="icon"></i
                  ></span>
                </div>
                <ul class="lv2">
                  <li>
                    <button
                      class="lv2-info row"
                      :class="{
                        active: selectStep == 3,
                      }"
                      @click="onMoveStep3()"
                    >
                      <div class="row">
                        <span class="label">성공지표명명</span>
                        <span class="info"></span>
                      </div>
                      <div class="row">
                        <span class="label">성공지표기준</span>
                        <span class="info"></span>
                      </div>
                      <div class="row">
                        <span class="label">보조지표명</span>
                        <span class="info"></span>
                      </div>
                      <div class="row">
                        <span class="label">보조지표기준</span>
                        <span class="info"></span>
                      </div>
                    </button>
                  </li>
                </ul>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import { directive as vTippy } from 'vue-tippy';

const props = defineProps({
  selectStep: {
    type: [String, Number],
    default: 2,
  },
  selectStep2Scene: {
    type: [String, Number],
    default: 1,
  },
  sideShow: {
    type: Boolean,
    default: true,
  },
});

const sideTitle = ref(
  '6월 인터넷 기가업셀_고객센터_OB  6월 인터넷 기가업셀_고객센터_OB',
);

const naviControl = reactive({
  step1: true,
  step2: false,
});

const emit = defineEmits(['moveStep2', 'moveStep3', 'sideShowHide']);
const onMoveStep2 = step => {
  emit('moveStep2', step);
};
const onMoveStep3 = () => {
  emit('moveStep3');
};

const isEll = ref(false);
const checkEllipsis = event => {
  const el = event.target;
  if (el.scrollHeight > el.clientHeight) {
    isEll.value = true;
  } else {
    isEll.value = false;
  }
};
</script>
