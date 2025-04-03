<template>
  <div class="window-contents v-scroll">
    <div class="window-header">상세조회 필터</div>
    <div class="window-body text-left">
      <ul class="accordion">
        <li
          class="acc-item"
          v-for="(item, rowIndex) in filterData"
          :key="rowIndex"
        >
          <div class="acc-title">{{ item.itemtype }}</div>
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
                <label v-for="sub2 in sub.sub2" :key="sub2">
                  <input type="checkbox" :name="sub2" :value="sub2" />
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

const selectCheckValues = ref('');
const selectedCheckData = ref({});
const filterData = ref([]);
const attachData = () => {
  filterData.value = [
    {
      id: 1,
      itemtype: '타겟 유형',
      sub: [
        {
          title: '구분',
          sub2: [{ title: '자사' }, { title: '타사' }],
        },
        {
          title: '서비스',
          sub2: [
            { title: '모바일' },
            { title: '인터넷' },
            { title: 'TV' },
            { title: '스마트홈' },
            { title: '기타' },
          ],
        },
        {
          title: '상품유형',
          sub2: [
            { title: '요금제' },
            { title: '부가서비스' },
            { title: '단말' },
            { title: '기타' },
          ],
        },
        {
          title: '업무구분',
          sub2: [
            { title: '상품변경' },
            { title: '약정갱신' },
            { title: '해지방어' },
            { title: '관계형성' },
            { title: '단순안내' },
          ],
        },
        {
          title: '업무상세',
          sub2: [{ title: '기가업셀' }, { title: '기타' }],
        },
      ],
    },
    {
      id: 2,
      itemtype: '채널유형',
      sub: [
        {
          title: '채널구분',
          sub2: [{ title: '디지털' }, { title: '고객센터' }, { title: '매장' }],
        },
      ],
    },
    {
      id: 3,
      itemtype: '타겟 일정',
      sub: [
        {
          title: '실행주기',
          sub2: [
            { title: '매월' },
            { title: '매주' },
            { title: '매일' },
            { title: '한번만' },
          ],
        },
      ],
    },
    {
      id: 4,
      itemtype: '연동 유무',
      sub: [
        {
          title: '연동타겟',
          sub2: [{ title: '있음' }, { title: '없음' }],
        },
        {
          title: '연동 CMS',
          sub2: [{ title: '있음' }, { title: '없음' }],
        },
      ],
    },
  ];
};

attachData();

const onSelectCheck = value => {
  const { id } = value;
  selectedCheckData.value = { ...value };
  selectCheckValues.value = id;
};

const emit = defineEmits(['cancel', 'confirm']);
const onCancel = () => {
  emit('cancel');
};

const onConfirm = () => {
  emit('confirm');
};
</script>
