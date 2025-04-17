<template>
  <div class="step-stage">
    <div class="stage-box">
      <div class="box-content">
        <div class="inner-wrap">
          <!-- <div class="sub-title">{{ tableData.title }}</div> -->
          <div class="data-table">
            <table>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>주기정보</th>
                  <td>{{ tableData.period }}</td>
                  <th>실행기간</th>
                  <td>{{ tableData.exePeriod }}</td>
                </tr>
                <tr>
                  <th>연동 타겟ID</th>
                  <td>{{ tableData.targetID }}</td>
                  <th>연동 타겟명</th>
                  <td>{{ tableData.targetName }}</td>
                </tr>
                <tr>
                  <th>연동 방식</th>
                  <td>{{ tableData.method }}</td>
                  <th>연동 시점</th>
                  <td>{{ tableData.ppoint }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const tableData = reactive({
  period: '주기(월) - 15일 11:00',
  exePeriod: '2025-05-15 ~ 2026-04-30',
  targetID: 'A0010005',
  targetName: '요금제업셀_넷플릭스 2025년 2Q',
  method: '연동 타겟 완료 후',
  ppoint: '30분 후',
});

const isEll = ref([]);
const checkEllipsis = (event, index) => {
  const el = event.target;
  if (el.scrollWidth > el.clientWidth) {
    isEll.value[index] = true;
  } else {
    isEll.value[index] = false;
  }
};
</script>
