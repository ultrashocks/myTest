<template>
  <div class="my-infos status">
    <div class="main-title">
      <div class="title-l">
        <span class="title">타겟 유형별 비중</span>
        <span class="info">조회기간 : {{ searchDate }}</span>
      </div>
      <div class="title-r"></div>
    </div>
    <div class="infos-row">
      <div class="info-box table scroll">
        <table class="info-table">
          <colgroup>
            <col width="130px" />
            <col width="130px" />
            <col width="130px" />
            <col width="130px" />
            <col width="130px" />
            <col width="130px" />
            <col width="130px" />
            <col width="130px" />
            <col width="130px" />
            <col width="130px" />
            <col width="130px" />
          </colgroup>
          <thead>
            <tr>
              <th>모바일-자사 홈단톡</th>
              <th>모바일-타사</th>
              <th>모바일-적정요금제</th>
              <th>인터넷-일반</th>
              <th>인터넷-기가업셀</th>
              <th>TV-주셋탑</th>
              <th>TV-주셋탑</th>
              <th>TV-주셋탑</th>
              <th>TV-주셋탑</th>
              <th>TV-주셋탑</th>
              <th>TV-주셋탑</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>CMS 전송</th>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <th>타겟 저장 후 종료</th>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchDate = ref('');

const attachData = () => {
  searchDate.value = '25-05-31 ~ 25-06-29';
};
attachData();
</script>
