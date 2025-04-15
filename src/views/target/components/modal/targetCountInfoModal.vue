<template>
  <div class="window-contents">
    <div class="window-header">타겟 회차 정보</div>
    <div class="window-body pd-wrap-lr">
      <div class="scroll-wrap">
        <div class="top-row">
          <div class="sub-title">
            <span>{{ targetCountInfoData.title }}</span>
          </div>
          <div class="sub-exp">
            <span>타겟 실행기간 : {{ targetCountInfoData.date }}</span>
            <span>{{ targetCountInfoData.period }}</span>
            <span>{{ targetCountInfoData.totalNum }}</span>
          </div>
        </div>
        <div class="table-row">
          <div class="table-scroll">
            <div class="table-header">
              <table>
                <colgroup>
                  <col width="10%" />
                  <col width="20%" />
                  <col width="15%" />
                  <col width="15%" />
                  <col width="15%" />
                  <col width="15%" />
                  <col width="10%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>회차</th>
                    <th>상태</th>
                    <th>스케줄 일시</th>
                    <th>실행 일시</th>
                    <th>타겟추출건수</th>
                    <th>CMS전송건수</th>
                    <th>타겟 세그</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="table-body">
              <table>
                <colgroup>
                  <col width="10%" />
                  <col width="20%" />
                  <col width="15%" />
                  <col width="15%" />
                  <col width="15%" />
                  <col width="15%" />
                  <col width="10%" />
                </colgroup>
                <tbody>
                  <tr v-for="item in tableData" :key="item.id">
                    <td>
                      <div class="td-col">{{ item.number }}</div>
                    </td>
                    <td :class="{ 'text-error': item.status === '실패' }">
                      <div class="td-col">{{ item.status }}</div>
                    </td>
                    <td>
                      <div class="td-col">{{ item.schedule }}</div>
                    </td>
                    <td>
                      <div class="td-col">{{ item.execution }}</div>
                    </td>
                    <td class="td-right">
                      <div class="td-col">{{ item.targetnum }}</div>
                    </td>
                    <td class="td-right">
                      <div class="td-col">{{ item.transnum }}</div>
                    </td>
                    <td>
                      <div class="td-col">
                        <button class="btn-intable">세그상세</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const tableData = ref([]);
const attachData = () => {
  tableData.value = [
    {
      id: 1,
      number: '1회차',
      status: 'CMS전송완료',
      schedule: '2025-05-31 11:00',
      execution: '2025-05-31 11:30',
      targetnum: '999,999,999,999',
      transnum: '999,999,999,999',
      seglink: '',
    },
    {
      id: 2,
      number: '2회차',
      status: 'CMS전송완료',
      schedule: '2025-06-30 11:00',
      execution: '2025-06-30 11:30',
      targetnum: '30,000',
      transnum: '27,000',
      seglink: '',
    },
    {
      id: 3,
      number: '3회차',
      status: '실패',
      schedule: '2025-07-31 11:00',
      execution: '2025-07-31 11:30',
      targetnum: '30,000',
      transnum: '0',
      seglink: '',
    },
    {
      id: 4,
      number: '4회차',
      status: 'AI 타겟 응답완료',
      schedule: '2025-08-31 11:00',
      execution: '2025-08-31 11:30',
      targetnum: '30,000',
      transnum: '27,000',
      seglink: '',
    },
    {
      id: 5,
      number: '5회차',
      status: '대기',
      schedule: '2025-09-30 11:00',
      execution: '-',
      targetnum: '-',
      transnum: '-',
      seglink: '',
    },
    {
      id: 6,
      number: '6회차',
      status: '대기',
      schedule: '2025-10-31 11:00',
      execution: '-',
      targetnum: '-',
      transnum: '-',
      seglink: '',
    },
    {
      id: 7,
      number: '7회차',
      status: '대기',
      schedule: '2025-11-30 11:00',
      execution: '-',
      targetnum: '-',
      transnum: '-',
      seglink: '',
    },
    {
      id: 8,
      number: '8회차',
      status: '대기',
      schedule: '2025-12-31 11:00',
      execution: '-',
      targetnum: '-',
      transnum: '-',
      seglink: '',
    },
    {
      id: 9,
      number: '9회차',
      status: '대기',
      schedule: '2025-12-31 11:00',
      execution: '-',
      targetnum: '-',
      transnum: '-',
      seglink: '',
    },
    {
      id: 10,
      number: '10회차',
      status: '대기',
      schedule: '2025-12-31 11:00',
      execution: '-',
      targetnum: '-',
      transnum: '-',
      seglink: '',
    },
    {
      id: 11,
      number: '11회차',
      status: '대기',
      schedule: '2025-12-31 11:00',
      execution: '-',
      targetnum: '-',
      transnum: '-',
      seglink: '',
    },
    {
      id: 12,
      number: '12회차',
      status: '대기',
      schedule: '2025-12-31 11:00',
      execution: '-',
      targetnum: '-',
      transnum: '-',
      seglink: '',
    },
  ];
};

attachData();

const targetCountInfoData = reactive({
  title: '6월 인터넷 기가업셀_고객센터_OB',
  date: '2025-05-01 ~ 2026-04-30',
  period: '주기(월)',
  totalNum: '총 12회',
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
