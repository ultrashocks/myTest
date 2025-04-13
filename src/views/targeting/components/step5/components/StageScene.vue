<template>
  <div class="stage-items step2">
    <div class="item-row targeting-infos">
      <div class="item-row">
        <div class="title-item">
          타겟 수
          <span
            class="btn-target-mosu ml16"
            @click="targetChangeWindowView = true"
            >타겟 수 늘려줘<i class="icon"></i
          ></span>
        </div>
        <div class="row-flex">
          <AppInput
            type="price"
            v-model="step5Data.targetCount"
            labelName="타겟 수"
            :readonly="true"
            style="flex: 1"
          />
          <!-- <AppInput
            type="price"
            labelName="예상성공률"
            :readonly="true"
            style="flex: 1"
          /> -->
          <AppInput
            type="text"
            labelName="성공기준"
            v-model="step5Data.successCriteria"
            :readonly="true"
            style="flex: 1"
          />
        </div>
        <div class="row-flex mt10">
          <div class="blank-flex"></div>
          <!-- <AppInput
            type="price"
            labelName="보조지표 예상성공률"
            :readonly="true"
            style="flex: 1"
          /> -->
          <AppInput
            type="text"
            labelName="보조지표 성공기준"
            v-model="step5Data.auxiliarySuccessCriteria"
            :readonly="true"
            style="flex: 1"
          />
        </div>
      </div>

      <div class="item-row">
        <div class="title-item">추천 키워드</div>
        <div class="row-flex">
          <div class="table-row">
            <div class="table-normal">
              <table>
                <colgroup>
                  <col width="35%" />
                  <col width="" />
                </colgroup>
                <thead>
                  <tr>
                    <th>키워드</th>
                    <th>설명</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="item in tableData" :key="item.id">
                    <td>
                      <div class="td-col">{{ item.keyword }}</div>
                    </td>
                    <td>
                      <div class="td-col">{{ item.explain }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppWindow
      v-model:view="targetChangeWindowView"
      width="516px"
      height="292px"
    >
      <TargetChangeWindow
        :targetValue="step5Data.targetCount"
        @cancel="targetChangeWindowView = false"
        @confirm="onWindowConfirm"
      />
    </AppWindow>
  </div>
</template>

<script setup>
import AppInput from '@/components/ui/AppInput.vue';
import AppSelectCode from '@/components/ui/AppSelectCode.vue';
import AppWindow from '@/components/ui/AppWindow.vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import TargetChangeWindow from './TargetChangeWindow.vue';
import { reactive, watch } from 'vue';
import { ref } from 'vue';

const step5Data = ref({
  targetCount: 300000,
  successCriteria: '업셀 성공률',
  auxiliarySuccessCriteria: '컨텍률',
});

const tableData = ref([
  { id: 1, keyword: '게임도 관심도 높음', explain: '게임 관심 지수 ≧ 8 ' },
  { id: 2, keyword: '재테크크 관심도 높음', explain: '경제력지수 ≧ 7' },
  {
    id: 3,
    keyword: '모바일 데이터 사용량 많음',
    explain: '모바일 데이터 사용 지수 ≧ 8',
  },
  {
    id: 4,
    keyword: '모바일 데이터 사용량 많음2',
    explain: '모바일 데이터 사용 지수 ≧ 9',
  },
  {
    id: 5,
    keyword: '모바일 데이터 사용량 많음3',
    explain: '모바일 데이터 사용 지수 ≧ 10',
  },
]);

const targetChangeWindowView = ref(false);

const onWindowConfirm = value => {
  step5Data.value.targetCount = value;
};
</script>
