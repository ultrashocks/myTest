<template>
  <div class="standard-marketing">
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
              v-for="(item, rowIndex) in tableData"
              :key="item.id"
              :class="{
                checked: item.checked,
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
        <div class="non-table__data" v-if="tableData.length < 1">
          <div class="msg-box">
            <i class="icon"></i>
            <div class="msg">조회 정보가 없습니다.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { useScrollChecker } from '@/composables/useScrollChecker';
import { useEllipsisChecker } from '@/composables/useEllipsisChecker';
import { randomKey } from '@/utils/utils';

// 스크롤 유무 체크
const scrollContainer = ref(null);
const { hasVerticalScroll, checkScroll } = useScrollChecker(scrollContainer);

// // 툴팁 유무 체크
const { isEll, checkEllipsis } = useEllipsisChecker();

const tableData = ref([]);
const total = ref(0);
const attachData = async () => {
  for (let i = 0; i < 50; i++) {
    tableData.value.push({
      id: randomKey(),
      checked: false,
      marketingCode: `M001000${i}`,
      marketingName: '인터넷_업셀_기가(1G)_디지털인터넷_업셀_기가(1G)',
    });
  }
  total.value = tableData.value.length;
  await nextTick();
  checkScroll();
};

defineExpose({
  attachData,
});

// onMounted(() => {
//   attachData();
// });
</script>
