<template>
  <div class="my-infos status">
    <div class="main-title">
      <div class="title-l">
        <span class="title">나의 타겟 현황</span>
        <span class="info">조회기간 : 최근 30일 ({{ searchDate }}) </span>
        <div class="legend">
          <span class="item"><i class="icon red"></i>CMS 전송</span>
          <span class="item"><i class="icon blue"></i>타겟 저장 후 종료</span>
        </div>
      </div>
      <div class="title-r"></div>
    </div>
    <div class="infos-row">
      <div class="box-col">
        <div class="info-box input-ai">
          <div class="label">작성중</div>
          <div class="count">
            <span class="num">
              <NumberAnimation
                :from="0"
                :to="data.typing"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
          </div>
        </div>
        <div class="info-box input-ai">
          <div class="label">AI 추천중</div>
          <div class="count">
            <span class="num">
              <NumberAnimation
                :from="0"
                :to="data.ai"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              /><span v-if="data.ai > 999">+</span>
            </span>
          </div>
        </div>
      </div>
      <div class="box-col">
        <div class="info-box top-bottom">
          <div class="label">작성완료</div>
          <div class="count">
            <span class="num cms use-hover">
              <NumberAnimation
                :from="0"
                :to="data.complete.cms"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
            <span class="num target use-hover">
              <NumberAnimation
                :from="0"
                :to="data.complete.target"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
          </div>
        </div>
        <div class="info-box top-bottom">
          <div class="label">대기중</div>
          <div class="count">
            <span class="num cms use-hover">
              <NumberAnimation
                :from="0"
                :to="data.waiting.cms"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
            <span class="num target use-hover">
              <NumberAnimation
                :from="0"
                :to="data.waiting.target"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
          </div>
        </div>
        <div class="info-box top-bottom">
          <div class="label">실행중</div>
          <div class="count">
            <span class="num cms use-hover">
              <NumberAnimation
                :from="0"
                :to="data.running.cms"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
            <span class="num target use-hover">
              <NumberAnimation
                :from="0"
                :to="data.running.target"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
          </div>
        </div>
        <div class="info-box top-bottom">
          <div class="label">실패</div>
          <div class="count">
            <span class="num cms use-hover">
              <NumberAnimation
                :from="0"
                :to="data.fail.cms"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
            <span class="num target use-hover">
              <NumberAnimation
                :from="0"
                :to="data.fail.target"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
          </div>
        </div>
        <div class="info-box top-bottom">
          <div class="label">중지</div>
          <div class="count">
            <span class="num cms use-hover">
              <NumberAnimation
                :from="0"
                :to="data.stop.cms"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
            <span class="num target use-hover">
              <NumberAnimation
                :from="0"
                :to="data.stop.target"
                :duration="1"
                :format="formatNumber"
                easing="linear"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NumberAnimation from 'vue-number-animation';
import { inject, reactive, ref } from 'vue';

const currentView = inject('currentView');
const onSelect = value => {
  currentView.value = value;
};

const searchDate = ref('');
const data = reactive({
  typing: 0,
  ai: 0,
  complete: { cms: 0, target: 0 },
  waiting: { cms: 0, target: 0 },
  running: { cms: 0, target: 0 },
  fail: { cms: 0, target: 0 },
  stop: { cms: 0, target: 0 },
});
const tableData = ref([]);

const attachData = () => {
  searchDate.value = '25-05-31 ~ 25-06-29';
  data.typing = Math.floor(Math.random() * 100);
  data.ai = Math.floor(Math.random() * 100);
  data.complete = {
    cms: Math.floor(Math.random() * 10),
    target: Math.floor(Math.random() * 10),
  };
  data.waiting = {
    cms: Math.floor(Math.random() * 10),
    target: Math.floor(Math.random() * 10),
  };
  data.running = {
    cms: Math.floor(Math.random() * 10),
    target: Math.floor(Math.random() * 10),
  };
  data.fail = {
    cms: Math.floor(Math.random() * 10),
    target: Math.floor(Math.random() * 10),
  };
  data.stop = {
    cms: Math.floor(Math.random() * 10),
    target: Math.floor(Math.random() * 10),
  };
};
attachData();

const formatNumber = value => {
  return `${Number(value).toFixed(0)}`;
};
</script>
