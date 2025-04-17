<template>
  <div class="step-stage">
    <div class="stage-box">
      <div class="box-content">
        <div class="inner-wrap">
          <div class="sub-title">{{ tableData.title }}</div>
          <div class="seg-wrap">
            <SegScene></SegScene>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import SegScene from '@/views/targeting/components/step6/components/SegScene1.vue';
const tableData = reactive({
  title: 'AI 추천 세그 - 세그 고정',
});

const isEll = ref([]);
const checkEllipsis = (event, index) => {
  const el = event.target;
  if (el.scrollWidth > el.clientWidth) {
    isEll.value[index] = true;
  } else {
    isEll.value[index] = false;
  }
};
</script>
