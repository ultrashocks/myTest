<template>
  <div class="my-infos status">
    <div class="main-title">
      <div class="title-l">
        <span class="title">타겟 유형별 비중</span>
        <span class="info">조회기간 : {{ searchDate }}</span>
      </div>
      <div class="title-r"></div>
    </div>
    <div class="infos-row team-target">
      <div class="silder-row">
        <swiper
          :slidesPerView="'auto'"
          :spaceBetween="8"
          :freeMode="false"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          :autoplay="{
            delay: 3000,
            pauseOnMouseEnter: true,
          }"
          class="swiper-container"
        >
          <swiper-slide v-for="item in data" :key="item.id">
            <div class="info-box top-bottom">
              <div class="label">{{ item.label }}</div>
              <div class="count">
                <span class="num cms">
                  <NumberAnimation
                    :from="0"
                    :to="item.count"
                    :duration="1"
                    :format="formatNumber"
                    easing="linear"
                  /><span class="unit">건</span>
                </span>
                <span class="num target">
                  <NumberAnimation
                    :from="0"
                    :to="item.per"
                    :duration="1"
                    :format="formatNumber"
                    easing="linear"
                  /><span class="unit">건</span>
                </span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import NumberAnimation from 'vue-number-animation';
import { ref } from 'vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

const modules = [FreeMode, Pagination, Autoplay];

const searchDate = ref('');
const data = ref([]);
const attachData = () => {
  searchDate.value = '최근 30일 (25-05-31 ~ 25-06-29)';
  let testData = [];
  const labels = [
    '모바일-자사 홈단톡',
    '모바일-타사',
    '모바일-적정요금제',
    '모바일-일반',
    '모바일-기가업셀',
    'TV-주셋탑',
    'TV-주셋탑',
    'TV-주셋탑',
    'TV-주셋탑',
    'TV-주셋탑',
    'TV-주셋탑',
  ];
  for (let i = 0; i < 11; i++) {
    testData.push({
      id: i,
      label: labels[i],
      count: Math.floor(Math.random() * 100),
      per: Math.floor(Math.random() * 100),
    });
  }
  data.value = testData;
};
attachData();

const formatNumber = value => {
  return `${Number(value).toFixed(0)}`;
};
</script>
