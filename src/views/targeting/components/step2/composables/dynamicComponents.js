import { defineAsyncComponent } from 'vue';

export function useDynamicComponents() {
  const getAsyncComponents = {
    StageScene1: defineAsyncComponent(() =>
      import('@/views/targeting/components/step2/components/StageScene1.vue'),
    ),
    StageScene2: defineAsyncComponent(() =>
      import('@/views/targeting/components/step2/components/StageScene2.vue'),
    ),
    StageScene3: defineAsyncComponent(() =>
      import('@/views/targeting/components/step2/components/StageScene3.vue'),
    ),
    StageScene4: defineAsyncComponent(() =>
      import('@/views/targeting/components/step2/components/StageScene4.vue'),
    ),
    StageScene5: defineAsyncComponent(() =>
      import('@/views/targeting/components/step2/components/StageScene5.vue'),
    ),
    StageScene6: defineAsyncComponent(() =>
      import('@/views/targeting/components/step2/components/StageScene6.vue'),
    ),
    StageScene7: defineAsyncComponent(() =>
      import('@/views/targeting/components/step2/components/StageScene7.vue'),
    ),
    StageScene8: defineAsyncComponent(() =>
      import('@/views/targeting/components/step2/components/StageScene8.vue'),
    ),
    StageScene9: defineAsyncComponent(() =>
      import('@/views/targeting/components/step2/components/StageScene9.vue'),
    ),
  };
  return {
    getAsyncComponents,
  };
}
