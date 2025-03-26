<template>
  <div class="window-contents">
    <div class="window-header">타겟 그룹 지정</div>
    <div class="window-body pd-wrap-lr">
      <div class="sub-title">타겟 그룹명</div>
      <div class="scroll-box tg-name">
        <ul class="radio-list">
          <li
            v-for="(item, rowIndex) in groupData"
            :key="item.id"
            :class="{ active: item.id === selectRadioValues }"
            @click="onSelectRow(item)"
            @mouseover="checkEllipsis($event, rowIndex)"
          >
            <div class="custom-radio">
              <label>
                <span @mouseover="checkEllipsis($event, rowIndex)">
                  {{ item.groupName }}
                </span>
                <input
                  type="radio"
                  name="radioSelect"
                  v-model="selectRadioValues"
                  :value="item.id"
                />
                <i class="icon"></i>
              </label>
            </div>
          </li>
        </ul>
        <!-- 조회 결과가 없는 경우에 보이게 처리 -->
        <!-- <div class="non-table__data">
          <div class="msg-box">
            <i class="icon"></i>
            <div class="msg">등록된 타겟 그룹이 없습니다.<br />그룹을 등록해 주세요.</div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button class="btn-s red" @click="onConfirm" disabled>적용</button>
      <!-- 항목 선택되면 disabled 속성 제거, 아래 참조
        <button class="btn-s red" @click="onConfirm">적용</button>
      -->
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useAlert } from '@/composables/alert';
import { onMounted, onUnmounted } from 'vue';
const { setAlertStatus } = useAlert();

/**
 * 테이블
 */
const selectRadioValues = ref('');
const groupData = ref([]);
const attachData = () => {
  groupData.value = [
    {
      id: 1,
      groupName: '인터넷 업셀',
    },
    {
      id: 2,
      groupName: '모바일 업셀',
    },
    {
      id: 3,
      groupName:
        '2025년 상반기 마케팅 활동2025년 상반기 마케팅 활동2025년 상반기 마케팅 활동2025년 상반기 마케팅 활동2025년 상반기 마케팅 활동',
    },
    {
      id: 4,
      groupName: '요금제제',
    },
    {
      id: 5,
      groupName: '해지방어',
    },
    {
      id: 6,
      groupName: '해지방어',
    },
    {
      id: 7,
      groupName: '해지방어',
    },
    {
      id: 8,
      groupName: '해지방어',
    },
    {
      id: 9,
      groupName: '해지방어',
    },
    {
      id: 10,
      groupName: '해지방어',
    },
  ];
};

attachData();

const emit = defineEmits(['cancel', 'confirm']);
const onCancel = () => {
  emit('cancel');
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

onMounted(() => {
  nextTick(() => {
    // checkOverflow();
  });
});
</script>
