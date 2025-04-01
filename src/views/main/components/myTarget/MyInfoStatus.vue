<template>
  <div class="my-infos status">
    <div class="main-title">
      <div class="title-l">
        <span class="title">나의 타겟 현황</span>
        <span class="info">조회기간 : {{ searchDate }} / 단위 : 건</span>
      </div>
      <div class="title-r"></div>
    </div>
    <div class="infos-row">
      <div class="info-box">
        <div class="label">입력중</div>
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
      <div class="info-box">
        <div class="label">AI 추천중</div>
        <div class="count">
          <span class="num">
            <NumberAnimation
              :from="0"
              :to="data.ai"
              :duration="1"
              :format="formatNumber"
              easing="linear"
            />
          </span>
        </div>
      </div>
      <div class="info-box table">
        <table class="info-table">
          <colgroup>
            <col width="" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>작성완료</th>
              <th>대기중</th>
              <th>실행중</th>
              <th>실패</th>
              <th>중지</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.id">
              <th>{{ item.label }}</th>
              <td v-for="(td, index) in item.data" :key="index">{{ td }}</td>
            </tr>
          </tbody>
        </table>
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
});
const tableData = ref([]);

const attachData = () => {
  searchDate.value = '25-05-31 ~ 25-06-29';
  data.typing = Math.floor(Math.random() * 100);
  data.ai = Math.floor(Math.random() * 100);

  let test = [
    { id: 1, label: 'CMS 전송', data: [1, 1, 11, 1, 1] },
    { id: 2, label: '타겟 저장 후 종료료', data: [0, 1, 2, 1, 3] },
  ];
  tableData.value = test;
};
attachData();

const formatNumber = value => {
  return `${Number(value).toFixed(0)}`;
};
</script>
