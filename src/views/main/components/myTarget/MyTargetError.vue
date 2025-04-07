<template>
  <div class="layout-box error">
    <div class="main-title">
      <div class="title-l">
        <span class="title"
          >{{ currentMonth }}월 오류발생 타겟 건 (<strong>{{ count }}</strong
          >)</span
        >
      </div>
      <div class="title-r"></div>
    </div>
    <div class="box-contents">
      <div class="error-list">
        <ul>
          <li v-for="(item, index) in listData" :key="item.id">
            <div class="item" @mouseover="checkEllipsis($event, index)">
              <div class="infos">
                <div class="row-l">
                  <span class="code">{{ item.code }}</span>
                  <span class="count"><strong>10</strong>{{ item.count }}</span>
                </div>
                <div class="row-r">{{ item.date }}</div>
              </div>
              <div class="title" :title="isEll[index] ? item.title : ''">
                {{ item.title }}
              </div>
              <div class="state">{{ item.state }}</div>
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

const currentMonth = ref('');
const count = ref(0);
const listData = ref([]);
const attachData = () => {
  let testData = [];
  for (let i = 0; i < 10; i++) {
    testData.push({
      id: i,
      code: `A001000${i}`,
      count: 10,
      date: '2025-06-15 11:30',
      title:
        '2025년 6월 인터넷_업셀_기가업셀_캠페인 타겟2025년 6월 인터넷_업셀_기가업셀_캠페인 타겟',
      state: 'AI타겟요청 응답실패',
    });
  }
  listData.value = testData;
  currentMonth.value = 6;
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
