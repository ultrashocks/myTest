<template>
  <div class="step-stage">
    <div class="stage-box">
      <div class="box-content">
        <div class="inner-wrap">
          <div class="sub-title">{{ tableData.title }}</div>
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
                  <th>타겟 수</th>
                  <td colspan="3">{{ tableData.targetNum }}</td>
                </tr>
                <tr>
                  <th>예상 성공률</th>
                  <td>{{ tableData.sucessRatio }}</td>
                  <th>성공기준</th>
                  <td>{{ tableData.sucessStd }}</td>
                </tr>
                <tr>
                  <th>보조지표 예상 성공률</th>
                  <td>{{ tableData.secondaryRatio }}</td>
                  <th>보조지표 성공기준</th>
                  <td>{{ tableData.secondaryStandard }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <div class="sub-title mt30">{{ tableData.title2 }}</div>
          <div class="data-table">
            <table>
              <colgroup>
                <col width="50%" />
                <col width="50%" />
              </colgroup>
              <thead>
                <tr>
                  <th>키워드</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{{ tableData.key1 }}</th>
                  <td class="no-wrap">{{ tableData.exp1 }}</td>
                </tr>
                <tr>
                  <th>{{ tableData.key2 }}</th>
                  <td class="no-wrap">{{ tableData.exp2 }}</td>
                </tr>
                <tr>
                  <th>{{ tableData.key3 }}</th>
                  <td class="no-wrap">{{ tableData.exp3 }}</td>
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
  title: 'AI 추천 타겟 수',
  title2: '추천 키워드',
  targetNum: '30,000',
  sucessRatio: '-',
  sucessStd: '업셀 성공률',
  secondaryRatio: '-',
  secondaryStandard: '컨택률',
  key1: '게임 관심도 높음',
  exp1: '게임 관심 지수 ≧ 8',
  key2: '재테크 관심도 높음',
  exp2: '경제력 지수 ≧ 7',
  key3: '모바일 데이터 사용량 많음',
  exp3: '모바일 데이터 사용 지수 ≧ 8',
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
