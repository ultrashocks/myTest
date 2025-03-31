import { defineAsyncComponent } from 'vue';

export function useDynamicComponents() {
  const getAsyncComponents = {
    MyTarget: defineAsyncComponent(() =>
      import('@/views/main/components/myTarget/MyTarget.vue'),
    ),
    TeamTarget: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamTarget.vue'),
    ),
  };
  return {
    getAsyncComponents,
  };
}
