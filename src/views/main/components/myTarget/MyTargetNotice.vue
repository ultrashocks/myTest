<template>
  <div class="layout-box notice">
    <div class="main-title">
      <div class="title-l">
        <span class="title">공지사항</span>
      </div>
      <div class="title-r">
        <span class="btn-more">더보기<i class="icon"></i></span>
      </div>
    </div>
    <div class="box-contents">
      <div class="notice-list">
        <ul>
          <li v-for="item in listData" :key="item.id">
            <div class="title">
              <div class="icons">
                <span class="important" v-if="item.important">중요</span>
                <span class="new" v-if="item.new">N</span>
              </div>
              {{ item.title }}
            </div>
            <div class="date">{{ item.date }}</div>
          </li>
        </ul>
      </div>
      <div class="non-table__data" v-if="listData.length < 1">
        <div class="msg-box">
          <i class="icon"></i>
          <div class="msg">조회 결과가 없습니다.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const listData = ref([]);
const attachData = () => {
  let testData = [];
  for (let i = 0; i < 10; i++) {
    testData.push({
      id: i,
      title: '시스템 정기 점검(6월 20일 20:00 ~ 6월 21일 06:00)',
      date: '25-06-15',
      important: Math.floor(Math.random() * 2),
      new: Math.floor(Math.random() * 2),
    });
  }
  listData.value = testData;
};

attachData();
</script>
