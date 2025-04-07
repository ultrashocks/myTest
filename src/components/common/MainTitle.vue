<template>
  <h2 class="page-title">
    {{ title }}
  </h2>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const title = ref('');

const route = useRoute();

title.value = route.meta.title;
</script>

<style></style>
