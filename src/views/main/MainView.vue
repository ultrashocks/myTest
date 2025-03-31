<template>
  <div class="contents-wrap">
    <section class="main-wrap">
      <article class="row-top">
        <div class="top-l">
          <MyInfoComp v-model:currentView="currentView" />
        </div>
        <div class="top-r">2</div>
      </article>
      <article class="row-bottom">
        <transition name="fade" mode="out-in">
          <component :is="getAsyncComponents[`${currentView}Target`]" />
        </transition>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useDynamicComponents } from './composables/dynamicComponents';
import MyInfoComp from './components/myTarget/MyInfoComp.vue';

const { getAsyncComponents } = useDynamicComponents();

const currentView = ref('My');
// const currentComponent = ref(`${currentView.value}Target`);
</script>
