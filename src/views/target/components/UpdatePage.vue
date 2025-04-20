<template>
  <div class="contents-wrap">
    <section class="targeting-wrap">
      <div class="top-title">
        <div class="inner-block">
          <button class="btn-back" @click="movePage">뒤로</button>
          <div class="title">{{ pageTitle }}</div>
        </div>
      </div>
      <div class="targeting-contents" :class="{ 'side-show': sideShow }">
        <Transition name="targeting-side">
          <SideTargeting
            v-if="true"
            :sideShow="sideShow"
            @sideShowHide="onSideShowHide"
          />
        </Transition>
        <Transition :name="transitionStyle" mode="out-in">
          <component
            v-model="stepData"
            :is="getAsyncComponents[currentComponent]"
          />
        </Transition>
      </div>
      <div class="bottom-controlls">
        <div class="control-l">
          <button class="btn-targeting">취소</button>
        </div>
        <div class="control-r">
          <button class="btn-step next" v-if="stepsComplete == 4">
            <span>다음</span>
          </button>
          <button class="btn-step complete" v-if="stepsComplete == 8">
            <span>설정 저장</span>
          </button>
          <button class="btn-step complete" v-if="stepsComplete == 6">
            <span>CMS로 보내기</span>
          </button>
          <button class="btn-step complete" v-if="false">
            <!-- 상황에 따라 나오게 -->
            <span>타겟 저장 후 종료</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import SideTargeting from '@/views/target/components/update/SideTargeting.vue';
import { useDynamicComponents } from './update/composables/dynamicComponents';
import router from '@/router';

/*
 * 상단 현재 Step 상태보기
 */
const stepsComplete = ref(4);
//
// defineProps(['id', 'title', 'pageStep']);

/*
 * Step별 다이나믹 컴포넌트
 */
const { getAsyncComponents } = useDynamicComponents();
const currentComponent = ref('');
const pageTitle = ref('');

const transitionStyle = ref('fade-next');
// Step별 데이터
const stepData = ref({
  step4: { data: 'test2' },
  step6: { data: 'test2' },
  step8: { data: 'test2' },
});

const sideShow = ref(true);
const onSideShowHide = () => {
  sideShow.value = !sideShow.value;
};

const windowWidth = ref(window.innerWidth);
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value < 1440) {
    sideShow.value = false;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  UpdatePageInit();
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

//받는쪽
const UpdatePageInit = () => {
  const storedData = sessionStorage.getItem('targetParams');
  let params = {};
  if (storedData) {
    params = JSON.parse(decodeURIComponent(storedData));
    stepsComplete.value = params.step;
  }
  currentComponent.value = `StageStep${stepsComplete.value}`;
  pageTitle.value = params.title;
};

const movePage = () => {
  sessionStorage.removeItem('targetParams');
  router.push({ name: 'target' });
};
</script>
