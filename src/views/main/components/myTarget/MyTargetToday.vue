<template>
  <div class="layout-box today">
    <div class="main-title">
      <div class="title-l">
        <span class="title"
          ><strong>TODAY</strong> AI타겟팅 진행 중 현황 (<strong>{{
            count
          }}</strong
          >)</span
        >
      </div>
      <div class="title-r"></div>
    </div>
    <div class="box-contents">
      <div class="today-list">
        <ul>
          <li v-for="(item, index) in listData" :key="item.id">
            <div class="item" @mouseover="checkEllipsis($event, index)">
              <div class="code">
                {{ item.code }}
              </div>
              <div class="title" :title="isEll[index] ? item.title : ''">
                {{ item.title }}
              </div>
              <div class="times">
                <div class="request">
                  <span class="lsp">요청시간</span>
                  <span>: {{ item.requestTime }}</span>
                </div>
                <div class="end">
                  예상종료시간 <span>: {{ item.endTime }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 조회 결과가 없는경우에 보이게 처리 -->
      <div class="non-table__data" v-if="listData.length < 1">
        <div class="msg-box">
          <i class="icon"></i>
          <div class="msg">타겟이 없습니다.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const listData = ref([]);
const count = ref(0);

const attachData = () => {
  let testData = [];
  for (let i = 0; i < 7; i++) {
    testData.push({
      id: i,
      code: `A001000${i}`,
      title:
        '인터넷_업셀_기가업셀인터넷_업셀_기가업셀인터넷_업셀_기가업셀인터넷_업셀_기가업셀',
      requestTime: '25-06-15 11:30',
      endTime: '25-06-15 11:30',
    });
  }
  listData.value = testData;
  count.value = testData.length;
};

attachData();

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
