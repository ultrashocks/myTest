<template>
  <div class="window-contents v-scroll">
    <div class="window-header in-btn">
      상세조회 필터
      <div class="block-btn">
        <button class="btn-textR">전체선택</button>
        <button class="btn-textR">전체해제</button>
      </div>
    </div>
    <div class="window-body text-left">
      <ul class="accordion">
        <li
          class="acc-item"
          v-for="(item, rowIndex) in filterData"
          :key="rowIndex"
        >
          <div
            class="acc-title"
            :class="{ active: item.open }"
            @click="item.open = !item.open"
          >
            <span>{{ item.itemtype }}<i class="icon"></i></span>
          </div>
          <div class="acc-container">
            <div
              class="filter-item"
              v-for="(sub, category) in item.sub"
              :key="category"
            >
              <div class="sub-title">
                {{ sub.title }}
              </div>
              <div class="btn-check-group grid-container">
                <label v-for="sub2 in sub.sub2" :key="sub2.id">
                  <input
                    type="checkbox"
                    :name="sub2.id"
                    :value="sub2.id"
                    :class="{ active: selectCheckValues.includes(sub2.id) }"
                    v-model="selectCheckValues"
                  />
                  <span class="btn-check">{{ sub2.title }}</span>
                </label>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button class="btn-s red" @click="onConfirm">적용</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';

const selectCheckValues = ref([]);
const selectedCheckData = ref({});
const filterData = ref([]);
const attachData = () => {
  filterData.value = [
    {
      id: 1,
      open: true,
      itemtype: '타겟 유형',
      sub: [
        {
          title: '구분',
          sub2: [
            { id: 1, title: '자사' },
            { id: 2, title: '타사' },
          ],
        },
        {
          title: '서비스',
          sub2: [
            { id: 3, title: '모바일' },
            { id: 4, title: '인터넷' },
            { id: 5, title: 'TV' },
            { id: 6, title: '스마트홈' },
            { id: 7, title: '기타' },
          ],
        },
        {
          title: '상품유형',
          sub2: [
            { id: 8, title: '요금제' },
            { id: 9, title: '부가서비스' },
            { id: 10, title: '단말' },
            { id: 11, title: '기타' },
          ],
        },
        {
          title: '업무구분',
          sub2: [
            { id: 12, title: '신규가입' },
            { id: 13, title: '상품변경' },
            { id: 14, title: '약정갱신' },
            { id: 15, title: '해지방어' },
            { id: 16, title: '관계형성' },
            { id: 17, title: '단순안내' },
          ],
        },
        {
          title: '업무상세',
          sub2: [
            { id: 18, title: '기가업셀' },
            { id: 19, title: '기타' },
          ],
        },
      ],
    },
    {
      id: 2,
      open: true,
      itemtype: '채널유형',
      sub: [
        {
          title: '채널구분',
          sub2: [
            { id: 20, title: '디지털' },
            { id: 21, title: '고객센터' },
            { id: 22, title: '매장' },
          ],
        },
      ],
    },
    {
      id: 3,
      open: true,
      itemtype: '타겟 일정',
      sub: [
        {
          title: '실행주기',
          sub2: [
            { id: 23, title: '매월' },
            { id: 24, title: '매주' },
            { id: 25, title: '매일' },
            { id: 26, title: '한번만' },
          ],
        },
      ],
    },
    {
      id: 4,
      open: true,
      itemtype: '연동 유무',
      sub: [
        {
          title: '연동타겟',
          sub2: [
            { id: 27, title: '있음' },
            { id: 28, title: '없음' },
          ],
        },
        {
          title: '연동 CMS',
          sub2: [
            { id: 29, title: '있음' },
            { id: 30, title: '없음' },
          ],
        },
      ],
    },
  ];
};

attachData();

const emit = defineEmits(['cancel', 'confirm']);
const onCancel = () => {
  emit('cancel');
};

const onConfirm = () => {
  emit('confirm');
};
</script>
