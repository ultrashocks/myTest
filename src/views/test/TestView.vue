<template>
  <div class="wrap">
    <div class="contents-wrap">
      <div class="test-wrap">
        {{ timeValue }}
        <AppDateTimeFromToPicker
          v-model:fromDate="fromDate"
          v-model:toDate="toDate"
        />
        <AppTimePicker v-model:time="timeValue" />
      </div>

      <!-- Confrim창 -->
      <AppDialog
        v-model:view="confirmState.view"
        :title="confirmState.title"
        :message="confirmState.message"
        @confirm="onConfrim"
      />

      <!-- Open Window창 -->
      <AppWindow v-model:view="windowView" width="650px" height="400px">
        <WindowContent
          @cancel="windowView = false"
          @confirm="onWindowConfirm"
        />
      </AppWindow>
    </div>
  </div>
</template>

<script setup>
import AppDialog from '@/components/ui/AppDialog.vue';
import AppWindow from '@/components/ui/AppWindow.vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSelectCode from '@/components/ui/AppSelectCode.vue';
import WindowContent from '@/views/test/WindowContent.vue';
import { useAlert } from '@/composables/alert';
import { useSpinner } from '@/composables/spinner';
import { useSlider } from '@/composables/slider';
import { ref } from 'vue';
import { reactive } from 'vue';
import { directive as vTippy } from 'vue-tippy';
import AppDateTimeFromToPicker from '@/components/calendar/AppDateTimeFromToPicker.vue';
import AppTimePicker from '../../components/calendar/AppTimePicker.vue';

const { setAlertStatus } = useAlert();
const { setSpinnerStatus } = useSpinner();
const { setSliderStatus } = useSlider();

// Confrim창
const confirmState = reactive({
  view: false,
  title: '확인',
  message: `삭제된 타겟은 복구되지 않습니다.<br>
공유 받은 상대방의 공유 받은 목록에서도 삭제됩니다.<br>
선택하신 타겟을 삭제하시겠습니까?`,
});
const onConfrim = () => {
  alert('확인 실행');
};

// Alert창
const alertView = () => {
  setAlertStatus({
    view: true,
    message: `실행재개가 되지 않은 타겟이 있습니다.<br>
총 10건 중 실행재개 성공 : 8건 / 실행재개 실패 : 2건<br>
“세그확인” 및 타겟 상태를 확인한 후 다시 시도해 주십시오.`,
  });
};

// Open Window
const windowView = ref(false);
const onWindowView = () => {
  windowView.value = true;
};
const onWindowConfirm = () => {
  windowView.value = false;
  alert('적용');
};

// Loader 테스트
const loaderView = () => {
  //loader 보이게
  setSpinnerStatus(true);
  //loader 사라지게(2초후 사라지게 임시 setTimeout 사용)
  setTimeout(() => {
    setSpinnerStatus(false);
  }, 2000);
};

// Toast
const toastView = () => {
  setSliderStatus({
    view: true,
    message: '타겟이 삭제되었습니다.',
  });
};

/****************************************************** */
// 셀렉트박스
const selectOptions = reactive([
  { label: '전체', value: 0 },
  { label: '아이템1', value: 1 },
  { label: '아이템2', value: 2 },
]);
const optionsSelected = ref({ label: '전체', value: 0 });

// Input
const inputValue = ref('테스트입니다.');
const inputValue2 = ref(1500);

// 마케팅 활동 코드 (테스트용이라 검색버튼 클릭시 강제로 값들어가게 테스트 처리)
const selectCode = ref('MK010');
const onSearch = () => {
  selectCode.value = 'MD123';
};

const timeValue = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
});

const fromDate = ref(new Date());
const toDate = ref(new Date());
</script>

<style lang="scss">
.test-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.test-btns {
  display: flex;
  gap: 20px;
  button {
    background-color: rgb(209, 209, 209);
    padding: 10px;
  }
}
</style>
