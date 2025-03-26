import { defineAsyncComponent } from 'vue';

export function useDynamicComponents() {
  const getAsyncComponents = {
    LoaderScene: defineAsyncComponent(() =>
      import('@/views/targeting/components/step5/components/LoaderScene.vue'),
    ),
    StageScene: defineAsyncComponent(() =>
      import('@/views/targeting/components/step5/components/StageScene.vue'),
    ),
  };
  return {
    getAsyncComponents,
  };
}
