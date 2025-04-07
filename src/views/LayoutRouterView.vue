<template>
  <div class="contents-wrap">
    <div class="contents-layout">
      <SideNavi />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <!-- <section class="contents-section">
        <Location />
        <MainTitle />
      </section> -->
    </div>
  </div>
</template>

<script setup></script>
