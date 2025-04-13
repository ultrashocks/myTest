<template>
  <div class="target-table__wrap">
    <div class="main-title">
      <div class="title-l">
        <span class="title">작성완료 타겟 현황</span>
      </div>
      <div class="title-r"></div>
    </div>
    <div class="table-row">
      <div class="table-scroll">
        <div class="table-header">
          <table>
            <colgroup>
              <col width="10%" />
              <col width="" />
              <col width="15%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="8px" v-if="hasVerticalScroll" />
            </colgroup>
            <thead>
              <tr>
                <th>타겟 ID</th>
                <th>타겟명</th>
                <th>타겟유형</th>
                <th>전송 구분</th>
                <th>목표타겟 수</th>
                <th>담당자</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="table-body" ref="scrollContainer">
          <table>
            <colgroup>
              <col width="10%" />
              <col width="" />
              <col width="15%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <tbody>
              <tr
                v-for="(item, rowIndex) in tableData"
                :key="item.id"
                @mouseover="checkEllipsis($event, rowIndex)"
              >
                <td>
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.targetId : ''"
                  >
                    {{ item.targetId }}
                  </div>
                </td>
                <td class="td-left">
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.targetName : ''"
                  >
                    {{ item.targetName }}
                  </div>
                </td>
                <td class="td-left">
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.targetCategory : ''"
                  >
                    {{ item.targetCategory }}
                  </div>
                </td>
                <td>
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.forwarding : ''"
                  >
                    {{ item.forwarding }}
                  </div>
                </td>
                <td>
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.marketing : ''"
                  >
                    {{ item.marketing }}
                  </div>
                </td>
                <td>
                  <div
                    class="td-col"
                    :title="isEll[rowIndex] ? item.manager : ''"
                  >
                    {{ item.manager }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 조회 결과가 없는경우에 보이게 처리 -->
          <div class="non-table__data" v-if="tableData.length < 1">
            <div class="msg-box">
              <i class="icon"></i>
              <div class="msg">타겟이 없습니다.</div>
            </div>
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

// 스크롤 유무 체크
const scrollContainer = ref(null);
const { hasVerticalScroll, checkScroll } = useScrollChecker(scrollContainer);

// // 툴팁 유무 체크
const { isEll, checkEllipsis } = useEllipsisChecker();

const tableData = ref([]);
const attachData = async () => {
  let testData = [];
  for (let i = 0; i < 8; i++) {
    testData.push({
      id: i,
      targetId: `A001000${i}`,
      targetName: `인터넷업셀_인터넷업셀_인터넷업셀_인터넷업셀_인터넷업셀_인터넷업셀_인터넷업셀_인터넷업셀_인터넷업셀_${i}`,
      targetCategory: 'TV/요금제/상품변경/업셀',
      forwarding: 'CMS 전송',
      marketing: '999,999,999',
      manager: '홍길동',
    });
  }
  tableData.value = testData;

  await nextTick();
  checkScroll();
};

onMounted(() => {
  attachData();
});
</script>
