import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    sideActive: true,
  }),
  getters: {
    getSideActive(state) {
      return state.sideActive;
    },
  },
  actions: {
    setSideActive(state) {
      this.sideActive = state;
    },
  },
});
