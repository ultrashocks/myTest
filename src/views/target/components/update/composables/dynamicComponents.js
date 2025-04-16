import { defineAsyncComponent } from 'vue';

export function useDynamicComponents() {
  const getAsyncComponents = {
    StageStep4: defineAsyncComponent(() =>
      import(
        '@/views/target/components/update/components/step4/StageStep4Update.vue'
      ),
    ),
    StageStep6: defineAsyncComponent(() =>
      import(
        '@/views/target/components/update/components/step6/StageStep6Update.vue'
      ),
    ),
    StageStep8: defineAsyncComponent(() =>
      import(
        '@/views/target/components/update/components/step8/StageStep8Update.vue'
      ),
    ),
  };
  return {
    getAsyncComponents,
  };
}
