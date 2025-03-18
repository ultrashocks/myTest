import { defineStore } from 'pinia';

export const useSliderStore = defineStore('slider', {
  state: () => ({
    sliderInfos: {
      view: false,
      message: '',
      state: 'success',
    },
  }),
  actions: {
    setSliderStatus(state) {
      this.sliderInfos = state;
    },
  },
});
