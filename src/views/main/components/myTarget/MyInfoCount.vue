<template>
  <div class="my-infos">
    <div class="info-title">
      <div class="title-l">
        <div class="user-name">
          <strong>{{ userName }}</strong
          >님
        </div>
        <span class="divide-line"></span>
        <div class="btns">
          <span
            class="btn-type my"
            :class="{ active: currentView === 'My' }"
            @click="onSelect('My')"
            >나의 타겟</span
          >
          <span
            class="btn-type team"
            :class="{ active: currentView === 'Team' }"
            @click="onSelect('Team')"
            >우리팀 타겟</span
          >
        </div>
      </div>
      <div class="title-r">
        <span class="btn-more">신규 타겟팅<i class="icon"></i></span>
      </div>
    </div>
    <div class="infos-row">
      <div class="info-box">
        <div class="label">나의 타겟</div>
        <div class="count">
          <span class="num">
            <NumberAnimation
              :from="0"
              :to="data.myTarget"
              :duration="1"
              :format="formatNumber"
              easing="linear"
            />
          </span>
        </div>
      </div>
      <div class="info-box">
        <div class="label">우리팀 타겟</div>
        <div class="count">
          <span class="num">
            <NumberAnimation
              :from="0"
              :to="data.teamTarget"
              :duration="1"
              :format="formatNumber"
              easing="linear"
            />
          </span>
        </div>
      </div>
      <div class="info-box">
        <div class="label">공유 받은 타겟</div>
        <div class="count">
          <span class="num">
            <NumberAnimation
              :from="0"
              :to="data.shareTarget"
              :duration="1"
              :format="formatNumber"
              easing="linear"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NumberAnimation from 'vue-number-animation';
import { inject, reactive } from 'vue';
import { ref } from 'vue';

const currentView = inject('currentView');
const onSelect = value => {
  currentView.value = value;
};

const formatNumber = value => {
  return `${Number(value).toFixed(0)}`;
};

const userName = ref('');
const data = reactive({
  myTarget: 0,
  teamTarget: 0,
  shareTarget: 0,
});

const attachData = () => {
  userName.value = '홍길동';
  data.myTarget = Math.floor(Math.random() * 100);
  data.teamTarget = Math.floor(Math.random() * 100);
  data.shareTarget = Math.floor(Math.random() * 100);
};

attachData();
</script>
