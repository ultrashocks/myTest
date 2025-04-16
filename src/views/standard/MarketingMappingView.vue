<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view">
          <div class="market-mapping">
            <div class="mapping-layout">
              <div class="mapping-left">
                <MarketingCms ref="marketingCmsRef" />
              </div>
              <div class="mapping-center">
                <button class="btn-mapping right" :disabled="btnInActive">
                  <i class="icon"></i>
                </button>
                <button class="btn-mapping left" :disabled="btnInActive">
                  <i class="icon"></i>
                </button>
              </div>
              <div class="mapping-right">
                <MarketingTarget
                  ref="marketingTargetRef"
                  @search="onTargetSearch"
                />
              </div>
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
const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);
const router = useRouter();

const marketingCmsRef = ref(null);
const marketingTargetRef = ref(null);

const btnInActive = ref(true);
const onTargetSearch = () => {
  console.log('타겟 조회');
  btnInActive.value = false;
};

const isFormValid = computed(() => {
  return (
    // infoData.value.screenType.length > 0 &&
    // infoData.value.useYn &&
    // infoData.value.service.value &&
    // infoData.value.businessType.value &&
    // infoData.value.productType.value &&
    // infoData.value.businessDetail.value
    true
  );
});

const onCancel = () => {
  console.log('취소');
  router.back();
};

const onSave = () => {
  console.log('저장');
};
</script>
