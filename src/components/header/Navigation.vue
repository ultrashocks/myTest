<template>
  <nav>
    <ul class="depth1">
      <li v-for="navi in naviData" :key="navi.link" class="lv1">
        <router-link
          :to="`${navi.path}`"
          class="btn-route"
          :class="{ useSub: navi.lv2.length > 1 }"
          ><span class="navi-text">{{ navi.title }}</span></router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  navis: {
    type: Array,
    default: () => [],
  },
});

const naviData = reactive(props.navis);

// onMounted(() => {
//   console.log('[route.matched] ', route, route.path, route.fullPath);
// });
</script>

<style lang="scss" scoped></style>
