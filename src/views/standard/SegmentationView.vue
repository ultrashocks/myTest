<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view"></div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);

const data = ref({
  use: '',
  segCode: '',
  segName: '',
  standard: 'id',
  segGroup: '',
  targetTable: '',
  columName: '',
  segExplain: '',
  segInfos: {
    segName: [],
    sql: '',
  },
});
</script>
