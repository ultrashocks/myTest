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
                arrow: false,
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
                <div
                  class="lv1-info"
                  :class="{ active: naviControl.step1 }"
                  @click="naviControl.step1 = !naviControl.step1"
                >
                  <div class="title">기본정보</div>
                  <span class="btn-show"><i class="icon"></i></span>
                </div>
                <ul class="lv2">
                  <li>
                    <button class="lv2-info">
                      <span class="label">서비스</span>
                      <span class="info">인터넷</span>
                    </button>
                  </li>
                  <li>
                    <button class="lv2-info">
                      <span class="label">상품유형</span>
                      <span class="info">요금제</span>
                    </button>
                  </li>
                  <li>
                    <button class="lv2-info">
                      <span class="label">업무구분</span>
                      <span class="info">상품변경</span>
                    </button>
                  </li>
                  <li>
                    <button class="lv2-info">
                      <span class="label">업무상세</span>
                      <span class="info">업무상세</span>
                    </button>
                  </li>
                  <li>
                    <button class="lv2-info">
                      <span class="label">채널</span>
                      <span class="info">고객센터</span>
                    </button>
                  </li>
                  <li>
                    <button class="lv2-info">
                      <span class="label">채널상세</span>
                      <span class="info">OB</span>
                    </button>
                  </li>
                  <li>
                    <button class="lv2-info row">
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
                    <button class="lv2-info row">
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

const emit = defineEmits(['sideShowHide']);

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
