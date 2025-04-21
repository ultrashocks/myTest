<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view">
          <div class="market-mapping">
            <div class="mapping-layout">
              <div class="mapping-left">
                <MarketingCms
                  v-model="marketingCmsData"
                  ref="marketingCmsRef"
                />
              </div>
              <div class="mapping-center">
                <button
                  class="btn-mapping right"
                  :disabled="btnInActive"
                  @click="onRightMove"
                >
                  <i class="icon"></i>
                </button>
                <button
                  class="btn-mapping left"
                  :disabled="btnInActive"
                  @click="onLeftMove"
                >
                  <i class="icon"></i>
                </button>
              </div>
              <div class="mapping-right">
                <!-- v-model:newTargetAddData="newTargetAddData" -->
                <MarketingTarget
                  v-model="marketingTargetData"
                  ref="marketingTargetRef"
                  @search="onTargetSearch"
                />
              </div>
            </div>
            <div class="bottom-btns__controls footer-button-box">
              <div class="btn-l"><button @click="onCancel">취소</button></div>
              <div class="btn-r">
                <button
                  class="emph"
                  @click="onSave"
                  :disabled="newTargetAddData.length < 1"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import MarketingCms from './components/marketing/MarketingCms.vue';
import MarketingTarget from './components/marketing/MarketingTarget.vue';
import { ref } from 'vue';
import { useAlert } from '@/composables/alert';
import { useSlider } from '@/composables/slider';

const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);
const router = useRouter();

// Alert창
const { setAlertStatus } = useAlert();

const { setSliderStatus } = useSlider();

const alertView = msg => {
  setAlertStatus({
    view: true,
    message: `${msg} 항목을 한개 이상 선택해주세요.`,
  });
};

const marketingCmsRef = ref(null);
const marketingTargetRef = ref(null);
const marketingCmsData = ref([]);
const marketingTargetData = ref([]);

const btnInActive = ref(true);
const onTargetSearch = () => {
  console.log('타겟 조회');
  btnInActive.value = false;
};

const newTargetAddData = ref([]);
const onRightMove = () => {
  console.log('오른쪽 이동');
  if (marketingCmsData.value.filter(item => item.checked).length === 0) {
    alertView('이동CMS 마케팅활동');
    return;
  }
  marketingCmsData.value.forEach(item => {
    if (item.checked) {
      marketingTargetData.value.unshift(item);
      newTargetAddData.value.push(item.id);
      marketingCmsData.value = marketingCmsData.value.filter(
        item => !item.checked,
      );
      marketingTargetData.value.forEach(targetItem => {
        if (newTargetAddData.value.includes(targetItem.id)) {
          targetItem.checked = false;
        }
      });
    }
  });
};

const onLeftMove = () => {
  console.log('왼쪽 이동');
  if (marketingTargetData.value.filter(item => item.checked).length === 0) {
    alertView('타겟 유형조합');
    return;
  }
  marketingTargetData.value.forEach(item => {
    if (item.checked) {
      marketingCmsData.value.unshift(item);
      marketingTargetData.value = marketingTargetData.value.filter(
        item => !item.checked,
      );
      item.checked = false;
      newTargetAddData.value = newTargetAddData.value.filter(
        id => id !== item.id,
      );
    }
  });
};

const onCancel = () => {
  console.log('취소');
  router.back();
};

const onSave = () => {
  console.log('저장');
  setSliderStatus({
    view: true,
    message: '저장되었습니다.',
  });
};
</script>
