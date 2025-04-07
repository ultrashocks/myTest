<template>
  <div class="contents-wrap">
    <section class="main-wrap">
      <article class="row-top">
        <transition name="fade" mode="out-in">
          <component :is="getAsyncComponents[`${currentView}Info`]" />
        </transition>
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
import { provide, ref } from 'vue';
import { useDynamicComponents } from './composables/dynamicComponents';

const { getAsyncComponents } = useDynamicComponents();

const currentView = ref('My');
provide('currentView', currentView);
</script>
