<template>
  <div class="layout-box cms">
    <div class="main-title">
      <div class="title-l">
        <span class="title"
          >CMS 전송 타겟 (<strong>{{ count }}</strong
          >)</span
        >
        <span class="info">조회기간 : {{ searchDate }}</span>
      </div>
      <div class="title-r"></div>
    </div>
    <div class="box-contents">
      <div class="table-scroll">
        <div class="table-header">
          <table>
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="116px" />
              <col width="10%" />
              <col width="8px" v-if="hasVerticalScroll" />
            </colgroup>
            <thead>
              <tr>
                <th>타겟 ID</th>
                <th>캠페인 코드</th>
                <th>캠페인명</th>
                <th>타겟추출건수</th>
                <th>TA회차정보</th>
                <th>전송상태</th>
                <th>적재완료시간</th>
                <th>CMS적재건수</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="table-body" ref="scrollContainer">
          <table>
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="116px" />
              <col width="10%" />
            </colgroup>
            <tbody>
              <tr
                v-for="(item, rowIndex) in tableData"
                :key="item.id"
                @mouseover="checkEllipsis($event, rowIndex)"
              >
                <td>
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.targetId : ''"
                  >
                    {{ item.targetId }}
                  </div>
                </td>
                <td>
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.campainId : ''"
                  >
                    {{ item.campainId }}
                  </div>
                </td>
                <td class="td-left">
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.campainName : ''"
                  >
                    {{ item.campainName }}
                  </div>
                </td>
                <td class="td-right">
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.targetCount : ''"
                  >
                    {{ item.targetCount }}
                  </div>
                </td>
                <td>
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.tvInfo : ''"
                  >
                    {{ item.tvInfo }}
                  </div>
                </td>
                <td>
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.transStatus : ''"
                  >
                    {{ item.transStatus }}
                  </div>
                </td>
                <td>
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.completeDateTime : ''"
                  >
                    {{ item.completeDateTime }}
                  </div>
                </td>
                <td class="td-right">
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.cmsCount : ''"
                  >
                    {{ item.cmsCount }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 조회 결과가 없는 경우에 보이게 처리 -->
          <div class="non-table__data" v-if="tableData.length < 1">
            <div class="msg-box">
              <i class="icon"></i>
              <div class="msg">타겟이 없습니다.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';

const searchDate = ref('');
const count = ref(0);
const tableData = ref([]);

const attachData = async () => {
  searchDate.value = '25-06-29 ~ 25-07-05';

  let testData = [];
  for (let i = 0; i < 8; i++) {
    testData.push({
      id: i,
      targetId: `A001000${i}`,
      campainId: `C0000011${i}`,
      campainName: `인터넷업셀인터넷업셀인터넷업셀인터넷업셀_${i}`,
      targetCount: '200,000',
      tvInfo: '실행대기',
      transStatus: '전송완료',
      completeDateTime: '25-06-30 10:30',
      cmsCount: '28,000',
    });
  }
  tableData.value = testData;
  count.value = testData.length;

  await nextTick();
  checkScroll();
};

const isEll = ref([]);
const checkEllipsis = (event, index) => {
  const el = event.target;
  if (el.scrollWidth > el.clientWidth) {
    isEll.value[index] = true;
  } else {
    isEll.value[index] = false;
  }
};

//스크롤 유무 체크
const scrollContainer = ref(null);
const hasVerticalScroll = ref(false);
const checkScroll = () => {
  const el = scrollContainer.value;
  console.log(el);
  if (!el) return;
  hasVerticalScroll.value = el.scrollHeight > el.clientHeight;
};

onMounted(() => {
  attachData();
});
</script>
