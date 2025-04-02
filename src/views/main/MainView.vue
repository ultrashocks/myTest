<template>
  <div class="contents-wrap">
    <section class="main-wrap">
      <article class="row-top">
        <!-- <component :is="getAsyncComponents[`${currentView}Info`]" /> -->
      </article>
      <article class="row-bottom">
        <component :is="getAsyncComponents[`${currentView}Target`]" />
      </article>
    </section>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import { useDynamicComponents } from './composables/dynamicComponents';

const { getAsyncComponents } = useDynamicComponents();

const currentView = ref('My');
provide('currentView', currentView);
</script>
