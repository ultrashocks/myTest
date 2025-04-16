<template>
  <div class="table-detail__wrap">
    <div class="table-detail__header">
      <div class="detail-title">공통코드 그룹 상세</div>
    </div>
    <div class="table-detail__body">
      <table>
        <colgroup>
          <col width="264" />
          <col width="" />
          <col width="264" />
          <col width="" />
        </colgroup>
        <tbody>
          <tr>
            <th>공통코드 그룹 ID</th>
            <td>
              <AppInput
                v-model="infoData.groupId"
                placeholder="공통코드 그룹 ID를 입력해주세요."
              />
            </td>
            <th rowspan="3" class="non-border-bottom">그룹코드 그룹 설명</th>
            <td rowspan="3" class="non-border-bottom">
              <textarea
                v-model="infoData.explain"
                placeholder="그룹코드 그룹 설명을 입력해주세요."
                style="height: 116px"
              ></textarea>
            </td>
          </tr>
          <tr>
            <th>공통코드 그룹명</th>
            <td>
              <AppInput
                v-model="infoData.groupName"
                placeholder="공통코드 그룹명을 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th>사용 여부</th>
            <td>
              <div class="radio-group__wrap">
                <div
                  class="custom-radio"
                  v-for="(item, index) in checkedUseYn"
                  :key="index"
                >
                  <label>
                    <input
                      type="radio"
                      name="useYn"
                      v-model="infoData.useYn"
                      :value="item.value"
                    />
                    <i class="icon"></i>
                    <span>{{ item.name }}</span>
                  </label>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CommonCodeList v-if="currentState === 'edit'" ref="commonCodeListRef" />
    <div class="bottom-btns__controls footer-button-box">
      <div class="btn-l"><button @click="onCancel">취소</button></div>
      <div class="btn-r">
        <button class="black" @click="onSave" :disabled="!isFormValid">
          저장
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';
import { randomKey } from '@/utils/utils';
import CommonCodeList from './CommonCodeList.vue';
import { useAlert } from '@/composables/alert';

const { setAlertStatus } = useAlert();

const props = defineProps({
  selectRowId: {
    type: String,
    default: '',
  },
  currentState: {
    type: String,
    default: '',
  },
});

//사용 여부
const checkedUseYn = ref([
  { name: '사용', value: 'Y' },
  { name: '미사용', value: 'N' },
]);

const infoData = ref({
  id: randomKey(),
  groupId: '',
  groupName: '',
  useYn: 'Y',
  explain: '',
  createdAt: '',
  modifier: '',
});

// 공통코드 그룹 상세
const attachGroupDetailData = () => {
  // props.selectRowId 값에 맞게 데이터 get 처리
  let sampleData = {
    groupId: '10100011',
    groupName: '인터넷_업셀_기가(1G)',
    useYn: 'Y',
    explain: '프로그램 설명',
    createdAt: '2025-04-13 10:00:00',
    modifier: '등록자 or 변경자',
  };
  infoData.value = { ...sampleData };
};

if (props.currentState === 'edit') {
  attachGroupDetailData();
}

// 공통코드 그룹 목록

const emit = defineEmits(['cancel', 'save']);

const onCancel = () => {
  console.log('취소');
  emit('cancel');
};

const commonCodeListRef = ref(null);

const onSave = () => {
  console.log('저장');
  if (props.currentState === 'edit') {
    if (commonCodeListRef.value.blankDataCheck()) {
      setAlertStatus({
        view: true,
        message: '필수 입력 항목을 입력해 주세요',
      });
      return;
    }
  }

  const sampleData = {
    createdAt: '2025-04-13 10:00:00',
    modifier: '등록자 or 변경자',
  };

  infoData.value = { ...infoData.value, ...sampleData };
  emit('save', infoData.value);
};

watch(
  () => props.selectRowId,
  () => {
    console.log('변경');
    attachGroupDetailData();
  },
);

const isFormValid = computed(() => {
  return (
    infoData.value.groupId &&
    infoData.value.groupName &&
    infoData.value.useYn &&
    infoData.value.explain
  );
});
</script>
