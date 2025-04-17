<template>
  <div class="mapping-box">
    <div class="table-controls">
      <div class="table-controls__left">
        <div class="sub-title">CMS 마케팅활동 조회</div>
      </div>
      <div class="table-controls__right"></div>
    </div>

    <div class="input-wrap marketing-target">
      <div class="input-inner">
        <div class="inner-item">
          <AppSelectBox
            :options="selectOptions"
            v-model:optionsSelected="searchData.selected"
            style="width: 100%"
          />
        </div>
        <div class="inner-item btn-search-box">
          <button class="btn-search" @click="onSearch">
            <i class="icon"></i>조회
          </button>
        </div>
      </div>
    </div>

    <div class="table-controls">
      <div class="table-controls__left">
        <div class="table-total">
          전체 <strong>{{ total }}</strong>
        </div>
      </div>
      <div class="table-controls__right"></div>
    </div>
    <div class="table-common">
      <div
        class="table-common__header"
        :class="{ 'has-scroll': hasVerticalScroll }"
      >
        <table>
          <colgroup>
            <col width="45" />
            <col width="25%" />
            <col width="" />
          </colgroup>
          <thead>
            <tr>
              <th>선택</th>
              <th>마케팅 활동코드</th>
              <th>마케팅 활동명</th>
            </tr>
          </thead>
        </table>
      </div>
      <div
        class="table-common__body"
        style="height: 363px"
        ref="scrollContainer"
      >
        <table>
          <colgroup>
            <col width="45" />
            <col width="25%" />
            <col width="" />
          </colgroup>
          <tbody>
            <tr
              v-for="(item, rowIndex) in modelValue"
              :key="item.id"
              :class="{
                checked: item.checked,
                'new-target': newTargetAddData.includes(item.id),
              }"
              @mouseover="checkEllipsis($event, rowIndex)"
            >
              <td>
                <div class="custom-checkbox">
                  <label @click.stop>
                    <input type="checkbox" v-model="item.checked" />
                    <i class="icon"></i>
                  </label>
                </div>
              </td>
              <td :title="isEll[rowIndex] ? item.marketingCode : ''">
                {{ item.marketingCode }}
              </td>
              <td
                :title="isEll[rowIndex] ? item.marketingName : ''"
                class="td-left"
              >
                {{ item.marketingName }}
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 조회 결과가 없는경우에 보이게 처리 -->
        <div class="non-table__data" v-if="modelValue.length < 1">
          <div class="msg-box">
            <i class="icon"></i>
            <div class="msg">
              {{
                initState
                  ? '타겟유형을 먼저 선택해 주세요.'
                  : `조회 정보가 없습니다.`
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, nextTick, onMounted } from 'vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import { useScrollChecker } from '@/composables/useScrollChecker';
import { useEllipsisChecker } from '@/composables/useEllipsisChecker';
import { randomKey } from '@/utils/utils';
import { useAlert } from '@/composables/alert';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  newTargetAddData: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'search']);

const initState = ref(true);

// 스크롤 유무 체크
const scrollContainer = ref(null);
const { hasVerticalScroll, checkScroll } = useScrollChecker(scrollContainer);

// // 툴팁 유무 체크
const { isEll, checkEllipsis } = useEllipsisChecker();

// const tableData = ref([]);
const total = ref(0);
const attachData = async () => {
  let sampleData = [];
  for (let i = 0; i < 5; i++) {
    sampleData.push({
      id: randomKey(),
      checked: false,
      marketingCode: `M001020${i}`,
      marketingName: '인터넷_업셀_기가(1G)',
    });
  }
  emit('update:modelValue', sampleData);
  total.value = sampleData.length;
  await nextTick();
  checkScroll();
};

// onMounted(() => {
//   attachData();
// });

// 사용유무
const selectOptions = reactive([
  { label: '타겟유형을 선택하세요.', value: '' },
  { label: '모바일/요금제/신규가입/자사 홈단독1', value: 1 },
  { label: '모바일/요금제/신규가입/자사 홈단독2', value: 2 },
]);

const searchData = reactive({
  selected: { label: '타겟유형을 선택하세요.', value: '' },
  marketingName: '',
});

// Alert창
const { setAlertStatus } = useAlert();
const alertView = () => {
  setAlertStatus({
    view: true,
    message: `타겟유형을 먼저 선택후 조회해 주세요.`,
  });
};

const onSearch = () => {
  if (searchData.selected.value === '') {
    alertView();
    return;
  }
  if (initState.value) {
    initState.value = false;
  }
  attachData();
  emit('search');
};
</script>
