<template>
  <div class="contents-wrap">
    <section class="target-wrap">
      <TopTabs v-model:currentTab="currentTab" />
      <div class="target-contents">
        <Transition mode="out-in">
          <component :is="getAsyncComponents[currentComponent]" />
        </Transition>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import TopTabs from './components/TopTabs.vue';
import { useDynamicComponents } from '@/views/target/composables/dynamicComponents';

const { getAsyncComponents } = useDynamicComponents();
const currentTab = ref(1);
const currentComponent = ref('TargetTab1');

watch(currentTab, newTab => {
  currentComponent.value = `TargetTab${newTab}`;
});
</script>
