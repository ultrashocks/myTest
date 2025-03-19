<template>
  <div class="window-contents">
    <div class="window-header">마케팅 활동코드</div>
    <div class="window-body">
      <div class="search-table">
        <div class="search-row">
          <div class="search-box">
            <div class="search-col">
              <label>활동구분</label>
              <AppSelectBox
                :options="activityOptions"
                v-model:optionsSelected="searchData.activitySelected"
                style="width: 114px"
              />
            </div>
            <div class="search-col">
              <label>서비스 구분</label>
              <AppSelectBox
                :options="serviceOptions"
                v-model:optionsSelected="searchData.serviceSelected"
                style="width: 114px"
              />
            </div>
            <div class="search-col">
              <label>마케팅 활동</label>
              <AppInput style="width: 245px" v-model="searchData.marketing" />
            </div>
            <button class="btn-search"><i class="icon"></i>조회</button>
          </div>
        </div>
        <div class="table-row">
          <div class="table-scroll" ref="tooltipContainer">
            <div class="table-header">
              <table>
                <colgroup>
                  <col width="4%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="" />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>활동구분</th>
                    <th>서비스구분</th>
                    <th>마케팅 활동코드</th>
                    <th>마케팅 활동명</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="table-body">
              <table>
                <colgroup>
                  <col width="4%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="" />
                </colgroup>
                <tbody>
                  <tr
                    v-for="item in tableData"
                    :key="item.id"
                    :class="{ active: item.id == selectRadioValues }"
                    @click="onSelectRow(item)"
                  >
                    <td>
                      <div class="td-col radio">
                        <div class="custom-radio">
                          <label>
                            <input
                              type="radio"
                              name="radioSelect"
                              v-model="selectRadioValues"
                              :value="item.id"
                            />
                            <i class="icon"></i>
                          </label>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="td-col">{{ item.activity }}</div>
                    </td>
                    <td>
                      <div class="td-col">{{ item.service }}</div>
                    </td>
                    <td>
                      <div class="td-col">{{ item.marketingCode }}</div>
                    </td>
                    <td class="td-left">
                      <!-- <div
                        class="td-col"
                        v-tooltip.bottom-start="{
                          content: item.marketingName,
                          transition: false,
                          hideDelay: 0,
                        }"
                      >
                        {{ item.marketingName }}
                      </div> -->
                      <div
                        class="td-col"
                        v-tippy="{
                          content: item.marketingName,
                          animation: 'none',
                          placement: 'bottom-start',
                          hideDelay: 0,
                          duration: 0,
                          appendTo: tooltipContainer,
                          trigger: 'mouseenter focus',
                          maxWidth: 'none',
                          onShow(instance) {
                            tooltipInstance = instance;
                          },
                        }"
                      >
                        {{ item.marketingName }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 조회 결과가 없는경우에 보이게 처리 -->
              <!-- <div class="non-table__data">
              <div class="msg-box">
                <i class="icon"></i>
                <div class="msg">조회 결과가 없습니다.</div>
              </div>
            </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="window-footer">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button class="btn-s red" @click="onConfirm">적용</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import 'tippy.js/dist/tippy.css';
import { directive as vTippy } from 'vue-tippy';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { useAlert } from '@/composables/alert';
import { onMounted, onUnmounted } from 'vue';
const { setAlertStatus } = useAlert();

const tooltipContainer = ref(null);
let tooltipInstance = null;
const hideTooltip = () => {
  if (tooltipInstance) {
    tooltipInstance.hide(); // 마우스 휠 작동 시 툴팁 숨김
  }
};

onMounted(() => {
  window.addEventListener('wheel', hideTooltip);
});

onUnmounted(() => {
  window.removeEventListener('wheel', hideTooltip);
});

/**
 * 검색 조건
 */
// 활동구분
const activityOptions = reactive([
  { label: '전체', value: 0 },
  { label: '활동#1', value: 1 },
  { label: '활동#2', value: 2 },
]);
// 서비스 구분
const serviceOptions = reactive([
  { label: '전체', value: 0 },
  { label: '구분#1', value: 1 },
  { label: '구분#2', value: 2 },
]);
const searchData = ref({
  activitySelected: { label: '전체', value: 0 },
  serviceSelected: { label: '전체', value: 0 },
  marketing: '',
});

/**
 * 테이블
 */
const selectRadioValues = ref('');
const selectedRowData = ref({});
const tableData = ref([]);
const attachData = () => {
  let testData = [];
  for (let i = 0; i < 30; i++) {
    const randomData = {
      id: i,
      activity: 'up-sell',
      service: '모바일',
      marketingCode: 'MK000',
      marketingName:
        '모바일 요금제 x VAS 업셀 모바일 요금제 x VAS 업셀 모바일 요금제x VAS 업셀 모바일 요금제 x VAS 업셀',
    };
    testData.push(randomData);
  }
  tableData.value = testData;
};

attachData();

const onSelectRow = value => {
  const { id } = value;
  selectedRowData.value = { ...value };
  selectRadioValues.value = id;
};

const emit = defineEmits(['cancel', 'confirm']);
const onCancel = () => {
  emit('cancel');
};

const onConfirm = () => {
  if (Object.keys(selectedRowData.value).length === 0) {
    setAlertStatus({
      view: true,
      message: `항목을 1개 선택해주세요.`,
    });
  } else {
    emit('confirm', selectedRowData.value);
    emit('cancel');
  }
};
</script>
