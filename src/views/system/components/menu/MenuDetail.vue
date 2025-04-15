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
            <th>메뉴명</th>
            <td>
              <AppInput
                v-model="infoData.menuName"
                placeholder="메뉴명을 입력해주세요."
              />
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
            <th>상위메뉴 ID(선택)</th>
            <td>
              <AppInput
                v-model="infoData.topMenuId"
                placeholder="상위메뉴 ID를 입력해주세요."
              />
            </td>
            <th>메뉴 ID</th>
            <td>
              {{ infoData.menuId }}
            </td>
          </tr>
          <tr>
            <th>메뉴 레벨</th>
            <td>
              <AppSelectBox
                v-model:optionsSelected="infoData.menuLevel"
                :options="menuLevelOptions"
                style="width: 100%"
              />
            </td>
            <th>메뉴 순서</th>
            <td>
              <AppInput
                v-model="infoData.menuOrder"
                placeholder="메뉴 순서를 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th>메뉴 모듈명</th>
            <td>
              <AppInput
                v-model="infoData.menuModelName"
                placeholder="메뉴모듈명을 입력해주세요."
              />
            </td>
            <th>등록 일시</th>
            <td>
              {{ infoData.createDate }}
            </td>
          </tr>
          <tr>
            <th>메뉴 설명(선택)</th>
            <td colspan="3">
              <AppInput
                v-model="infoData.menuDesc"
                placeholder="메뉴 설명을 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th>권한관리</th>
            <td colspan="3">
              <div class="check-group__wrap">
                <div
                  class="custom-checkbox"
                  v-for="(item, index) in checkedAuth"
                  :key="index"
                >
                  <label>
                    <input
                      type="checkbox"
                      v-model="infoData.auth"
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

//화면 유형
const menuLevelOptions = ref([
  { label: '0레벨', value: '0' },
  { label: '1레벨', value: '1' },
  { label: '2레벨', value: '2' },
  { label: '3레벨', value: '3' },
  { label: '4레벨', value: '4' },
  { label: '5레벨', value: '5' },
]);

//사용 여부
const checkedUseYn = ref([
  { name: '사용', value: 'Y' },
  { name: '미사용', value: 'N' },
]);

// 권한 관리
const checkedAuth = ref([
  { name: '일반(마케터)', value: '일반(마케터)' },
  { name: '팀장', value: '팀장' },
  { name: '거버넌트(현업)', value: '거버넌트(현업)' },
  { name: 'IT(Admin)', value: 'IT(Admin)' },
]);

const infoData = ref({
  id: randomKey(),
  checked: false,
  menuName: '',
  useYn: 'Y',
  topMenuId: '',
  menuId: '',
  menuLevel: { label: '0레벨', value: '0' },
  menuOrder: '',
  menuModelName: '',
  createDate: '',
  menuDesc: '',
  auth: [],
});

const attachData = () => {
  // props.selectRowId 값에 맞게 데이터 get 처리
  let sampleData = {
    checked: false,
    menuName: '인터넷_업셀_기가(1G)',
    useYn: 'Y',
    topMenuId: '10100011',
    menuId: `M00${randomKey(5)}`,
    menuLevel: { label: '2레벨', value: '2' },
    menuOrder: '1',
    menuModelName: '모델명',
    createDate: '2025-04-12 12:00:00',
    menuDesc: '메뉴 설명',
    auth: ['일반(마케터)', '팀장'],
  };
  infoData.value = { ...sampleData };
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
    infoData.value.menuName &&
    infoData.value.useYn &&
    infoData.value.menuLevel &&
    infoData.value.menuOrder &&
    infoData.value.menuModelName &&
    infoData.value.auth.length > 0
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
