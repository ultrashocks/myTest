import { defineAsyncComponent } from 'vue';

export function useDynamicComponents() {
  const getAsyncComponents = {
    StageStep1: defineAsyncComponent(() =>
      import('@/views/targeting/components/step1/StageStep1.vue'),
    ),
    StageStep2: defineAsyncComponent(() =>
      import('@/views/targeting/components/step2/StageStep2.vue'),
    ),
    StageStep3: defineAsyncComponent(() =>
      import('@/views/targeting/components/step3/StageStep3.vue'),
    ),
    StageStep4: defineAsyncComponent(() =>
      import('@/views/targeting/components/step4/StageStep4.vue'),
    ),
    StageStep5: defineAsyncComponent(() =>
      import('@/views/targeting/components/step5/StageStep5.vue'),
    ),
    StageStep6: defineAsyncComponent(() =>
      import('@/views/targeting/components/step6/StageStep6.vue'),
    ),
    StageStep7: defineAsyncComponent(() =>
      import('@/views/targeting/components/step7/StageStep7.vue'),
    ),
    StageStep8: defineAsyncComponent(() =>
      import('@/views/targeting/components/step8/StageStep8.vue'),
    ),
    StageComplete: defineAsyncComponent(() =>
      import('@/views/targeting/components/complete/StageComplete.vue'),
    ),
  };
  return {
    getAsyncComponents,
  };
}
