<template>
  <div class="contents-wrap">
    <section class="main-wrap">
      <article class="row-top">
        <component :is="`${currentView}Info`" />
      </article>
      <article class="row-bottom">
        <component :is="`${currentView}Target`" />
      </article>
    </section>
  </div>
</template>

<script setup>
import { provide, ref, watch, shallowRef } from 'vue';
import MyTarget from '@/views/main/components/myTarget/MyTarget.vue';
import MyInfo from '@/views/main/components/myTarget/MyInfo.vue';
import TeamInfo from '@/views/main/components/teamTarget/TeamInfo.vue';
import TeamTarget from '@/views/main/components/teamTarget/TeamTarget.vue';

const currentView = shallowRef('My');
provide('currentView', currentView);

watch(
  () => currentView.value,
  () => {
    console.log('222');
  },
);
</script>
