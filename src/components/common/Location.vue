<template>
  <div class="location-wrap">
    <div class="location-box">
      <!-- <EventSlideText /> -->
      <ul class="location">
        <li>Home</li>
        <li v-for="(item, index) in location" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
    <span class="vixwin-logo"></span>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const location = ref([]);

const route = useRoute();

route.matched.map(match => {
  location.value.push(match.meta.title);
});

// if (location.value.length === 3 && location.value[1] === location.value[2]) {
//   location.value.pop();
// }
</script>

<style></style>
