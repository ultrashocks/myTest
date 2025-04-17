<template>
  <div class="window-contents">
    <div class="window-header">CMS전송 정보</div>
    <div class="window-body pd-wrap-lr">
      <div class="sub-title">{{ cmsTransInfoData.title }}</div>
      <div class="data-table">
        <table>
          <colgroup>
            <col width="15%" />
            <col width="25%" />
            <col width="15%" />
            <col width="45%" />
          </colgroup>
          <tbody>
            <tr>
              <th>마케팅활동ID</th>
              <td>{{ cmsTransInfoData.marketingID }}</td>
              <th>마케팅활동명</th>
              <td
                :title="isEll[rowIndex] ? cmsTransInfoData.marketingName : ''"
                @mouseover="checkEllipsis($event, rowIndex)"
              >
                {{ cmsTransInfoData.marketingName }}
              </td>
            </tr>
            <tr>
              <th>캠페인 코드</th>
              <td>{{ cmsTransInfoData.campaignCode }}</td>
              <th>캠페인명</th>
              <td
                :title="isEll[rowIndex] ? cmsTransInfoData.campaignName : ''"
                @mouseover="checkEllipsis($event, rowIndex)"
              >
                {{ cmsTransInfoData.campaignName }}
              </td>
            </tr>
            <tr>
              <th>플로우차트ID</th>
              <td>{{ cmsTransInfoData.flowchartID }}</td>
              <th>플로우차트명</th>
              <td
                :title="isEll[rowIndex] ? cmsTransInfoData.flowchartName : ''"
                @mouseover="checkEllipsis($event, rowIndex)"
              >
                {{ cmsTransInfoData.flowchartName }}
              </td>
            </tr>
            <tr>
              <th>주기정보</th>
              <td>{{ cmsTransInfoData.cycleInfo }}</td>
              <th>실행기간</th>
              <td>{{ cmsTransInfoData.exePeriod }}</td>
            </tr>
            <tr>
              <th>타겟 상태</th>
              <td>{{ cmsTransInfoData.targetState }}</td>
              <th>채널</th>
              <td>{{ cmsTransInfoData.targetChannel }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const cmsTransInfoData = reactive({
  title: '6월 인터넷 기가업셀_고객센터_OB',
  marketingID: 'MK010',
  marketingName:
    '모바일요금제xVAS업셀모바일요금제xVAS업셀모바일요금제xVAS업셀모바일요금제xVAS업셀모바일요금제xVAS업셀',
  campaignCode: 'C00000112',
  campaignName: '요금제업셀_넷플릭스 2025년 2Q',
  flowchartID: 'FC003',
  flowchartName: '혜택안내_3개월',
  cycleInfo: '주기(월) - 15일 11:00',
  exePeriod: '2025-05-15 ~ 2026-04-30',
  targetState: '실행중',
  targetChannel: '고객센터',
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
