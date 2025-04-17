<template>
  <div class="table-detail__wrap">
    <div class="table-detail__header">
      <div class="detail-title">메뉴 상세</div>
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
            <th>화면 유형</th>
            <td>
              <div class="check-group__wrap">
                <div
                  class="custom-checkbox"
                  v-for="(item, index) in screenType"
                  :key="index"
                >
                  <label>
                    <input
                      type="checkbox"
                      v-model="infoData.screenType"
                      :value="item.value"
                      :disabled="isDisabled"
                    />
                    <i class="icon"></i>
                    <span>{{ item.name }}</span>
                  </label>
                </div>
              </div>
            </td>
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
          <tr>
            <th>서비스</th>
            <td>
              <AppSelectBox
                v-model:optionsSelected="infoData.service"
                :options="serviceOptions"
                style="width: 100%"
                :disabled="isDisabled"
              />
            </td>
            <th>업무구분</th>
            <td>
              <AppSelectBox
                v-model:optionsSelected="infoData.businessType"
                :options="businessTypeOptions"
                style="width: 100%"
                :disabled="isDisabled"
              />
            </td>
          </tr>
          <tr>
            <th>상품유형</th>
            <td>
              <AppSelectBox
                v-model:optionsSelected="infoData.productType"
                :options="productTypeOptions"
                style="width: 100%"
                :disabled="isDisabled"
              />
            </td>
            <th>업무상세</th>
            <td>
              <AppSelectBox
                v-model:optionsSelected="infoData.businessDetail"
                :options="businessDetailOptions"
                style="width: 100%"
                :disabled="isDisabled"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="detail-infos__list">
      <ul>
        <li>
          <i class="icon"></i> 타겟유형에 “성공/보조지표, 제외/제한 조건의 추천”
          값이 필요하시면, SM에게 DB 정보 업데이트를 요청해 주십시오.
        </li>
        <li v-if="props.currentState === 'edit'">
          <i class="icon"></i>
          <strong
            >타겟유형 조합이 선택된 타겟이 있으면, ‘사용 여부’만 수정이
            가능합니다.</strong
          >
        </li>
      </ul>
    </div>
    <div class="bottom-btns__controls footer-button-box">
      <div class="btn-l"><button @click="onCancel">취소</button></div>
      <div class="btn-r">
        <button class="emph" @click="onSave" :disabled="!isFormValid">
          저장
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import { randomKey } from '@/utils/utils';
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

// 화면 유형
const screenType = ref([
  { name: '자사', value: '자사' },
  { name: '타사', value: '타사' },
]);

//사용 여부
const checkedUseYn = ref([
  { name: '사용', value: 'Y' },
  { name: '미사용', value: 'N' },
]);

// 서비스
const serviceOptions = ref([
  { label: '선택', value: '' },
  { label: '모바일', value: '모바일' },
  { label: '인터넷', value: '인터넷' },
  { label: 'TV', value: 'TV' },
]);

// 업무구분
const businessTypeOptions = ref([
  { label: '선택', value: '' },
  { label: '신규가입', value: '신규가입' },
  { label: '추가가입', value: '추가가입' },
]);

// 상품유형
const productTypeOptions = ref([
  { label: '선택', value: '' },
  { label: '요금제', value: '요금제' },
  { label: '부가서비스', value: '부가서비스' },
]);

// 업무상세
const businessDetailOptions = ref([
  { label: '선택', value: '' },
  { label: '가족추천', value: '가족추천' },
  { label: '적정 요금제', value: '적정 요금제' },
]);

const infoData = ref({
  id: randomKey(),
  screenType: [],
  useYn: 'Y',
  service: { label: '선택', value: '' },
  businessType: { label: '선택', value: '' },
  productType: { label: '선택', value: '' },
  businessDetail: { label: '선택', value: '' },
});

const attachData = () => {
  // props.selectRowId 값에 맞게 데이터 get 처리
  let sampleData = {
    screenType: ['자사'],
    useYn: 'N',
    service: { label: '모바일', value: '모바일' },
    businessType: { label: '신규가입', value: '신규가입' },
    productType: { label: '요금제', value: '요금제' },
    businessDetail: { label: '가족추천', value: '가족추천' },
  };
  infoData.value = { ...sampleData };

  // infoData.value.screenType = ['자사'] 인 경우에는 ;
};

if (props.currentState === 'edit') {
  attachData();
}

const emit = defineEmits(['cancel', 'save']);

const onCancel = () => {
  console.log('취소');
  emit('cancel');
};

const onSave = () => {
  console.log('저장');
  infoData.value.menuId = `M00${randomKey(5)}`;
  emit('save', infoData.value);
};

const isFormValid = computed(() => {
  return (
    infoData.value.screenType.length > 0 &&
    infoData.value.useYn &&
    infoData.value.service.value &&
    infoData.value.businessType.value &&
    infoData.value.productType.value &&
    infoData.value.businessDetail.value
  );
});

const isDisabled = computed(() => {
  return (
    props.currentState === 'edit' &&
    infoData.value.screenType.length === 1 &&
    infoData.value.screenType.includes('자사')
  );
});

watch(
  () => props.selectRowId,
  () => {
    console.log('변경');
    attachData();
  },
);
</script>
