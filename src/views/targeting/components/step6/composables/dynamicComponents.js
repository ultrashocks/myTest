import { defineAsyncComponent } from 'vue';

export function useDynamicComponents() {
  const getAsyncComponents = {
    SegScene1: defineAsyncComponent(() =>
      import('@/views/targeting/components/step6/components/SegScene1.vue'),
    ),
    SegScene2: defineAsyncComponent(() =>
      import('@/views/targeting/components/step6/components/SegScene2.vue'),
    ),
  };
  return {
    getAsyncComponents,
  };
}
