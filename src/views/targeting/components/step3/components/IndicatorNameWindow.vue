<template>
  <div class="window-contents">
    <div class="window-header">성공지표</div>
    <div class="window-body">
      <div class="search-table">
        <div class="search-row">
          <div class="search-box">
            <div class="search-col">
              <label>성공 지표명</label>
              <AppInput
                style="width: 250px"
                v-model="searchData"
                placeholder="찾고 싶은 성공지표명을 입력해 주세요."
              />
            </div>
            <button class="btn-search"><i class="icon"></i>조회</button>
          </div>
        </div>
        <div class="succes-items__row">
          <div
            class="item"
            :class="{ active: selectedData.id === item.id }"
            v-for="item in itemData"
            :key="item.id"
            @click="onSelect(item)"
          >
            <div class="item-name">{{ item.name }}</div>
            <div class="item-standard">{{ item.standard }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button class="btn-s red" @click="onConfirm" :disabled="isEmpty">
        적용
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { onMounted, onUnmounted } from 'vue';
import { computed } from 'vue';

/**
 * 검색 조건
 */
const searchData = ref('');

/**
 * 테이블
 */
const itemData = ref([]);
const attachData = () => {
  const standard = [
    '상품(모바일요금제)',
    '상품(인터넷요금제)',
    '상품(U+tv요금제)',
    '상품(IOT요금제)',
    '상품(모바일부가서비스)',
    '상품(인터넷부가서비스)',
    '상품(U+tv부가서비스)',
    '상품(모바일요금제)',
    '상품(언터넷요금제)',
    '상품(U+tv요금제)',
    '상품(IOT요금제)',
    '상품(모바일부가서비스)',
    '상품(인터넷부가서비스)',
    '상품(U+tv부가서비스)',
    '순액증대(모바일요금제)',
    '순액증대(인터넷요금제)',
    '순액증대(U+tv요금제)',
    '순액증대(모바일부가서비스)',
  ];
  let testData = [];
  for (let i = 0; i < 18; i++) {
    testData.push({
      id: i + 1,
      name: i < 15 ? '유치성공율_금액기준' : '업셀성공율',
      standard: standard[i],
    });
  }
  itemData.value = testData;
};

attachData();

const selectedData = ref({});
const onSelect = item => {
  selectedData.value = item;
};

const emit = defineEmits(['cancel', 'confirm']);
const onCancel = () => {
  emit('cancel');
};

const onConfirm = () => {
  emit('confirm', selectedData.value);
  emit('cancel');
};

const isEmpty = computed(() => Object.keys(selectedData.value).length === 0);
</script>
