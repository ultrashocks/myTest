import { defineAsyncComponent } from 'vue';

export function useDynamicComponents() {
  const getAsyncComponents = {
    TargetTab1: defineAsyncComponent(() =>
      import('@/views/target/components/tab1/TargetTab1.vue'),
    ),
    TargetTab2: defineAsyncComponent(() =>
      import('@/views/target/components/tab2/TargetTab2.vue'),
    ),
    TargetTab3: defineAsyncComponent(() =>
      import('@/views/target/components/tab3/TargetTab3.vue'),
    ),
    TargetTab4: defineAsyncComponent(() =>
      import('@/views/target/components/tab4/TargetTab4.vue'),
    ),
  };
  return {
    getAsyncComponents,
  };
}
