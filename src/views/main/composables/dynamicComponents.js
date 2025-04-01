import { defineAsyncComponent } from 'vue';

export function useDynamicComponents() {
  const getAsyncComponents = {
    MyTarget: defineAsyncComponent(() =>
      import('@/views/main/components/myTarget/MyTarget.vue'),
    ),
    MyInfo: defineAsyncComponent(() =>
      import('@/views/main/components/myTarget/MyInfo.vue'),
    ),
    TeamInfo: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamInfo.vue'),
    ),
    TeamTarget: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamTarget.vue'),
    ),
  };
  return {
    getAsyncComponents,
  };
}
