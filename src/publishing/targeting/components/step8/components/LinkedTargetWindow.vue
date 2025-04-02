<template>
  <div class="window-contents">
    <div class="window-header">연동타겟 선택</div>
    <div class="window-body">
      <div class="search-table">
        <div class="search-row">
          <div class="search-box">
            <div class="search-col">
              <label>연동타겟ID</label>
              <AppInput
                style="width: 130px"
                v-model="searchData.targetId"
                placeholder="연동타겟ID 입력"
              />
            </div>
            <div class="search-col">
              <label>타겟명</label>
              <AppInput
                style="width: 130px"
                v-model="searchData.targetName"
                placeholder="타겟명 입력"
              />
            </div>
            <div class="search-col">
              <label>이동/부서</label>
              <AppInput
                style="width: 245px"
                v-model="searchData.department"
                placeholder="이동/부서 입력"
              />
            </div>
            <button class="btn-search"><i class="icon"></i>조회</button>
          </div>
        </div>
        <div class="table-row">
          <div class="table-scroll">
            <div class="table-header">
              <table>
                <colgroup>
                  <col width="4%" />
                  <col width="12%" />
                  <col width="" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>타겟ID</th>
                    <th>타겟명</th>
                    <th>타겟유형</th>
                    <th>작성자</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="table-body">
              <table>
                <colgroup>
                  <col width="4%" />
                  <col width="12%" />
                  <col width="" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <tbody>
                  <tr
                    v-for="(item, rowIndex) in tableData"
                    :key="item.id"
                    :class="{ active: item.id === selectRadioValues }"
                    @click="onSelectRow(item)"
                    @mouseover="checkEllipsis($event, rowIndex)"
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
                        :title="isEll[rowIndex] ? item.targetType : ''"
                      >
                        {{ item.targetType }}
                      </div>
                    </td>
                    <td class="td-left">
                      <div
                        class="td-col"
                        :title="isEll[rowIndex] ? item.author : ''"
                      >
                        {{ item.author }}
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
      <button
        class="btn-s red"
        @click="onConfirm"
        :disabled="selectRadioValues === ''"
      >
        적용
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppInput from '@/components/ui/AppInput.vue';

/**
 * 검색 조건
 */
const searchData = ref({
  targetId: '',
  targetName: '',
  department: '',
});

/**
 * 테이블
 */
const selectRadioValues = ref('');
const selectedRowData = ref({});
const tableData = ref([]);
const attachData = () => {
  tableData.value = [
    {
      id: 1,
      targetId: 'A0010001',
      targetName: '요금제업셀_넷플릭스 2025년 2Q',
      targetType: 'TV/요금제/상품변경/업셀',
      author: '홍길동(GILDONG)/CVM/플랫폼팀',
    },
    {
      id: 2,
      targetId: 'A0010002',
      targetName: '혜택안내_업셀',
      targetType: 'TV/부가서비스/신규가입/월정액',
      author: '홍길동(GILDONG)/CVM/플랫폼팀홍길동(GILDONG)/CVM/플랫폼팀',
    },
    {
      id: 3,
      targetId: 'A0010003',
      targetName: '요금제업셀_넷플릭스 2025년 2Q요금제업셀_넷플릭스 2025년 2Q',
      targetType: '인터넷/요금제/상품변경/기가업셀',
      author: '홍길동(GILDONG)/CVM/플랫폼팀',
    },
  ];
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

const isEll = ref([]);
const checkEllipsis = (event, index) => {
  const el = event.target;
  if (el.scrollWidth > el.clientWidth) {
    isEll.value[index] = true;
  } else {
    isEll.value[index] = false;
  }
};
const onConfirm = () => {
  emit('confirm', selectedRowData.value);
  emit('cancel');
};
</script>
