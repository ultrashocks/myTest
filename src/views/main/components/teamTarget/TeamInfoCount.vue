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
        <span class="btn-new__targeting">신규 타겟팅<i class="icon"></i></span>
      </div>
    </div>
    <div class="infos-row">
      <div class="info-box">
        <div class="label">우리팀 타겟</div>
        <div class="count">
          <span class="num">
            <NumberAnimation
              :from="0"
              :to="teamTarget"
              :duration="1"
              :format="formatNumber"
              easing="linear"
            />
          </span>
        </div>
      </div>
      <div class="team-list">
        <ul>
          <li v-for="item in teamList" :key="item.id">
            <div class="name">{{ item.name }}</div>
            <div class="num">{{ item.num }}</div>
          </li>
        </ul>
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
const teamTarget = ref(0);
const teamList = ref([]);

const attachData = () => {
  userName.value = '홍길동';
  teamTarget.value = Math.floor(Math.random() * 100);
  let testData = [
    { id: 1, name: '김유플', num: 20 },
    { id: 2, name: '김철수', num: 30 },
    { id: 3, name: '장필수', num: 40 },
    { id: 4, name: '홍길동', num: 50 },
  ];
  teamList.value = testData;
};

attachData();
</script>
