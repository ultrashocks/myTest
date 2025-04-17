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
                  <th>타겟 그룹</th>
                  <td>{{ tableData.targetGroup }}</td>
                  <th>대상 고객</th>
                  <td>
                    {{ tableData.customer }}
                  </td>
                </tr>
                <tr>
                  <th>마케팅 활동코드</th>
                  <td>{{ tableData.marketingCode }}</td>
                  <th>마케팅 활동명</th>
                  <td
                    :title="isEll[rowIndex] ? tableData.marketingName : ''"
                    @mouseover="checkEllipsis($event, rowIndex)"
                  >
                    {{ tableData.marketingName }}
                  </td>
                </tr>
                <tr>
                  <th>타겟 업무</th>
                  <td
                    :title="isEll[rowIndex] ? tableData.targetWork : ''"
                    @mouseover="checkEllipsis($event, rowIndex)"
                  >
                    {{ tableData.targetWork }}
                  </td>
                  <th>타겟 채널</th>
                  <td>
                    {{ tableData.targetChannel }}
                  </td>
                </tr>
                <tr>
                  <th>목표 타겟 건수</th>
                  <td>{{ tableData.targetNum }}</td>
                  <th>대조군 비율</th>
                  <td>{{ tableData.groupRatio }}</td>
                </tr>
                <tr>
                  <th>목표 최대 세그</th>
                  <td>{{ tableData.targetSeg }}</td>
                  <th></th>
                  <td></td>
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
  title: '6월 인터넷 기가업셀_고객센터_OB',
  targetGroup: '미지정',
  customer: '자사',
  marketingCode: 'MK010',
  marketingName:
    '모바일요금제xVAS업셀 모바일요금제xVAS업셀 모바일요금제xVAS업셀',
  targetWork:
    '인터넷/요금제/상품명/기가업셀/요금제/상품명/기가업셀/요금제/상품명/기가업셀',
  targetChannel: '고객센터/OB',
  targetNum: '30,000',
  groupRatio: '-',
  targetSeg: 'AI 추천',
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
