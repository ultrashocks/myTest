<template>
  <div class="table-detail__wrap">
    <div class="table-detail__header">
      <div class="detail-title">프로그램 상세</div>
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
              <div class="radio-group__wrap">
                <div
                  class="custom-radio"
                  v-for="(item, index) in checkedScreenType"
                  :key="index"
                >
                  <label>
                    <input
                      type="radio"
                      name="screenType"
                      v-model="infoData.screenType"
                      :value="item.value"
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
            <th>프로그램명</th>
            <td>
              <AppInput
                v-model="infoData.prgName"
                placeholder="프로그램명을 입력해주세요."
              />
            </td>
            <th>프로그램 ID</th>
            <td>
              {{ infoData.prgId }}
            </td>
          </tr>
          <tr>
            <th>메뉴 모델명</th>
            <td>
              <AppInput
                v-model="infoData.menuModelName"
                placeholder="메뉴 모델명을 입력해주세요."
              />
            </td>
            <th>등록일시</th>
            <td>
              {{ infoData.createDate }}
            </td>
          </tr>
          <tr>
            <th>액션 URL</th>
            <td colspan="3">
              <AppInput
                v-model="infoData.actionUrl"
                placeholder="액션 URL을 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th>프로그램 설명(선택)</th>
            <td colspan="3">
              <AppInput
                v-model="infoData.prgDesc"
                placeholder="프로그램 설명을 입력해주세요."
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
const checkedScreenType = ref([
  { name: '화면', value: '화면' },
  { name: '레이어 팝업', value: '레이어 팝업' },
  { name: '시스템 팝업', value: '시스템 팝업' },
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
  screenType: '화면',
  useYn: 'Y',
  checked: false,
  prgId: '',
  prgName: '',
  menuModelName: '',
  actionUrl: '',
  auth: [],
  prgDesc: '',
  createDate: '',
});

const attachData = () => {
  // props.selectRowId 값에 맞게 데이터 get 처리
  let sampleData = {
    prgId: `M00${randomKey(5)}`,
    screenType: '화면',
    useYn: 'Y',
    checked: false,
    prgName: '인터넷_업셀_기가(1G)',
    menuModelName: '모델명',
    actionUrl: '/web/target/components/tab4/TargetTab4.vue',
    auth: ['일반(마케터)', '팀장', '거버넌트(현업)', 'IT(Admin)'],
    prgDesc: '프로그램 설명',
    createDate: '2025-04-12 12:00:00',
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
  infoData.value.prgId = `M00${randomKey(5)}`;
  emit('save', infoData.value);
};

watch(
  () => props.selectRowId,
  () => {
    console.log('변경');
    attachData();
  },
);

const isFormValid = computed(() => {
  return (
    infoData.value.screenType &&
    infoData.value.useYn &&
    infoData.value.prgName &&
    infoData.value.menuModelName &&
    infoData.value.actionUrl &&
    infoData.value.auth.length > 0
  );
});
</script>
