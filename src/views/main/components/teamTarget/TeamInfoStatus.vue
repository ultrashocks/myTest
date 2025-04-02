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
            <col
              width="130px"
              v-for="(col, index) in tableData.colums"
              :key="index"
            />
          </colgroup>
          <thead>
            <tr>
              <th v-for="(col, index) in tableData.colums" :key="index">
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(col, rowIndex) in tableData.rowData" :key="rowIndex">
              <td v-for="(item, tdIndex) in col" :key="tdIndex">{{ item }}</td>
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
const tableData = ref({});

const attachData = () => {
  searchDate.value = '25-05-31 ~ 25-06-29';
  let sampleData = {
    colums: [
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
    ],
    rowData: [
      ['CMS 전송', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ['타겟 저장 후 종료', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  };
  tableData.value = sampleData;
};
attachData();
</script>
