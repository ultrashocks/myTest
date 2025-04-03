import { defineAsyncComponent } from 'vue';

export function useDynamicComponents() {
  const getAsyncComponents = {
    TeamTargetTable1: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamTargetTable1.vue'),
    ),
    TeamTargetTable2: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamTargetTable2.vue'),
    ),
    TeamTargetTable3: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamTargetTable3.vue'),
    ),
    TeamTargetTable4: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamTargetTable4.vue'),
    ),
    TeamTargetTable5: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamTargetTable5.vue'),
    ),
    TeamTargetTable6: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamTargetTable6.vue'),
    ),
    TeamTargetTable7: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamTargetTable7.vue'),
    ),
    TeamTargetTable8: defineAsyncComponent(() =>
      import('@/views/main/components/teamTarget/TeamTargetTable8.vue'),
    ),
  };
  return {
    getAsyncComponents,
  };
}
