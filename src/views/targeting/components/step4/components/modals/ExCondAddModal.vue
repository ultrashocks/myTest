<template>
  <div class="window-contents">
    <div class="window-header">
      제외조건 추가
      <button
        class="btn-info"
        v-tippy="{
          content:
            '원하는 조건이 검색되지 않으면 SQL등록으로 추가하시거나<br>업무지원 &gt; Q&amp;A(소셜데스크 이동) &gt; [기준정보등록] 카테고리에 <br>요청해 주시기 바랍니다.',
          placement: 'right-start',
          allowHTML: true,
          maxWidth: 500,
        }"
      >
        <span>도움말</span>
      </button>
    </div>
    <div class="window-body">
      <div class="search-table">
        <div class="tabs-row">
          <div class="top-tabs">
            <div
              class="top-tab"
              :class="{ active: selectTab === item.id }"
              @click="onSelectTab(item.id)"
              v-for="item in tabData"
              :key="item.id"
            >
              <div class="item">
                <div class="label">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 목록에서 선택 탭 -->
        <div v-if="selectTab === 1">
          <div class="search-row">
            <div class="search-box">
              <div class="search-col">
                <label>구분</label>
                <AppSelectBox
                  :options="typeOptions"
                  v-model:optionsSelected="searchData.typeSelected"
                  style="width: 114px"
                />
              </div>
              <div class="search-col">
                <label>조건 그룹</label>
                <AppSelectBox
                  :options="groupOptions"
                  v-model:optionsSelected="searchData.groupSelected"
                  style="width: 114px"
                />
              </div>
              <div class="search-col">
                <label>조건명</label>
                <AppInput
                  style="width: 315px"
                  v-model="searchData.title"
                  placeholder="조건명 입력"
                />
              </div>
              <button class="btn-search"><i class="icon"></i>조회</button>
            </div>
          </div>
          <div class="table-row use-tab">
            <div class="table-scroll">
              <div class="table-header">
                <table>
                  <colgroup>
                    <col width="4%" />
                    <col width="10%" />
                    <col width="16%" />
                    <col width="" />
                    <col width="10%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>
                        <!--                        <div class="td-col radio">-->
                        <!--                          <div-->
                        <!--                            class="custom-checkbox"-->
                        <!--                            style="margin-left: 14.5px"-->
                        <!--                          >-->
                        <!--                            <label>-->
                        <!--                              <input-->
                        <!--                                type="checkbox"-->
                        <!--                                v-model="selectAll"-->
                        <!--                                @change="toggleSelectAll"-->
                        <!--                              />-->
                        <!--                              <i class="icon"></i>-->
                        <!--                            </label>-->
                        <!--                          </div>-->
                        <!--                        </div>-->
                      </th>
                      <th>구분</th>
                      <th>조건그룹</th>
                      <th>마케팅 활동명</th>
                      <th>작성자</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table-body">
                <table>
                  <colgroup>
                    <col width="4%" />
                    <col width="10%" />
                    <col width="16%" />
                    <col width="" />
                    <col width="10%" />
                  </colgroup>
                  <tbody>
                    <tr
                      v-for="(item, rowIndex) in tableData"
                      :key="item.id"
                      :class="{ active: selectedRows.includes(item.id) }"
                      @mouseover="checkEllipsis($event, rowIndex)"
                      class="type2"
                    >
                      <td>
                        <div class="td-col radio">
                          <div class="custom-checkbox">
                            <label>
                              <input
                                type="checkbox"
                                v-model="selectedRows"
                                @click="onSelectRow(item)"
                                :value="item.id"
                                @change="updateSelectAll"
                              />
                              <i class="icon"></i>
                            </label>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          class="td-col"
                          :title="isEll[rowIndex] ? item.type : ''"
                        >
                          {{ item.type }}
                        </div>
                      </td>
                      <td>
                        <div
                          class="td-col"
                          :title="isEll[rowIndex] ? item.group : ''"
                        >
                          {{ item.group }}
                        </div>
                      </td>
                      <td class="td-left">
                        <div
                          class="td-col d-flex align-center gap-4px"
                          :title="isEll[rowIndex] ? item.marketingName : ''"
                        >
                          {{ item.marketingName }}
                          <!-- sql있는지 여부 컬럼명은 다를 수 있습니다. -->
                          <button
                            class="btn-type3"
                            v-if="
                              item.sqlYn &&
                              item.sqlYn !== '' &&
                              item.sqlYn !== 'N'
                            "
                            @click="onSqlModal(item.marketingName)"
                          >
                            SQL 확인
                          </button>
                          <button
                            class="btn-type2"
                            v-if="
                              item.sqlYn &&
                              item.sqlYn !== '' &&
                              item.sqlYn !== 'N'
                            "
                            @click="updateSql(item.id)"
                          >
                            수정
                          </button>
                        </div>
                      </td>
                      <td class="">
                        <div
                          class="td-col"
                          :title="isEll[rowIndex] ? item.userId : ''"
                        >
                          {{ item.userId }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- SQL 선택 탭 -->
        <div v-else class="">
          <div class="add-row">
            <div class="add-box">
              <div class="d-flex align-center mb8">
                <span class="font-size-18 font-weight-600 font-secondary"
                  >조건명 기재</span
                >
                <button
                  class="btn-info"
                  v-tippy="{
                    content:
                      '조건명 작성 시 주의사항<br>1) 조건명을 기재하고 [입력] 버튼을 누르셔야 SQL 입력이 가능합니다.<br>2) 조건명은 중복되지 않도록 작성되어야 합니다.',
                    placement: 'right-start',
                    allowHTML: true,
                    maxWidth: 500,
                  }"
                >
                  <span>도움말</span>
                </button>
              </div>
              <div
                class="d-flex align-center justify-between gap-8px position relative mb74"
              >
                <AppInput
                  style="width: 100%"
                  v-model="searchData.title"
                  placeholder="최대 50자, (예시) 넷플릭스에서 ‘흑백요리사’ 검색 고객"
                />
                <button class="btn-search w-53px" @click="addCondName">
                  입력
                </button>
                <div
                  class="position absolute"
                  style="transform: translate(0%, 150%)"
                >
                  <span v-if="condNameChk" class="font-success font-size-12"
                    >사용할 수 있는 조건명 입니다.</span
                  >
                  <span v-else class="">사용할 수 없는 조건명 입니다.</span>
                </div>
              </div>
              <div class="sqlAddWrap">
                <div class="d-flex align-center justify-between">
                  <div class="d-flex align-center mb8">
                    <span
                      class="font-size-18 font-weight-600 text-nowrap font-secondary"
                      >SQL 입력</span
                    >
                    <button
                      class="btn-info"
                      v-tippy="{
                        content:
                          'SQL 작성 시 주의사항<br>1) SELECT 절에는 최종적으로 ENTRE_NO, CUST_NO컬럼만 있어야 합니다.<br>(타사고객의 경우 ENTR_NO 대신 OCMP_CUST_ID)<br>2) From 절에는 &quot;qcp-prod-edp-lake&quot;의 데이블만 사용 가능합니다.',
                        placement: 'right-start',
                        allowHTML: true,
                        maxWidth: 500,
                      }"
                    >
                      <span>도움말</span>
                    </button>
                  </div>
                  <div>
                    <button class="btn-s red" disabled>SQL 검증</button
                    ><!-- 0418 disabled 예시-->
                  </div>
                </div>
                <div class="sqlAddMid">
                  <textarea v-model="sqlText" disabled></textarea
                  ><!-- 0418 disabled 예시-->
                </div>
                <div class="sqlAddBottom">
                  <div class="custom-checkbox" style="margin-right: 5px">
                    <label>
                      <input
                        type="checkbox"
                        disabled
                      /><!-- 0418 disabled 예시-->
                      <i class="icon"></i>
                    </label>
                  </div>
                  <span
                    >향후 동일한 SQL로 조건을 지속 사용할 경우 체크해 주세요.
                    이후에는 조건 리스트 선택에서 검색하여 사용 가능합니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="window-footer" v-if="selectTab === 1">
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button
        class="btn-s red"
        @click="onConfirmTab01"
        :disabled="selectCnt < 1"
      >
        적용
      </button>
    </div>
    <div class="window-footer" v-else>
      <button class="btn-s gray" @click="onCancel">취소</button>
      <button
        class="btn-s red"
        @click="onConfirmTab02"
        :disabled="!isTextEntered"
      >
        적용
      </button>
    </div>
    <sqlViewModal
      v-model:view="openViewSqlModal"
      v-model:sqlText="sqlText"
      v-model:targetName="targetName"
      @cancel="openViewSqlModal = false"
    ></sqlViewModal>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue';
import AppSelectBox from '@/components/ui/AppSelectBox.vue';
import AppInput from '@/components/ui/AppInput.vue';
import sqlViewModal from './sqlViewModal.vue';
import { directive as vTippy } from 'vue-tippy';

/**
 * 탭
 */
const selectTab = ref(1);
const condNameChk = ref(true);
const tabData = ref([
  { id: 1, title: '목록에서 선택' },
  { id: 2, title: 'SQL 등록' },
]);
const onSelectTab = id => {
  selectTab.value = id;
};

/**
 * 검색 조건
 */
// 구분
const typeOptions = reactive([
  { label: '전체', value: 0 },
  { label: '구분#1', value: 1 },
  { label: '구분#2', value: 2 },
]);
// 조건 그룹
const groupOptions = reactive([
  { label: '전체', value: 0 },
  { label: '그룹#1', value: 1 },
  { label: '그룹#2', value: 2 },
]);
const searchData = ref({
  typeSelected: { label: '전체', value: 0 },
  groupSelected: { label: '전체', value: 0 },
  title: '',
});
/**
 * 테이블
 */
const tableData = ref([]);
const attachData = () => {
  tableData.value = [
    {
      id: 1 + 'pop' + Date.now(),
      type: '사용자정의',
      group: '캠페인',
      marketingName: '특정 캠페인 타겟 고객(CMS)',
      userId: 'admin',
      sqlYn: '',
    },
    {
      id: 2 + 'pop' + Date.now(),
      type: '부가서비스',
      group: '미디어 서비스',
      marketingName: '넷플릭스 프리미엄',
      userId: 'admin',
      // sql이 있는 로우
      sqlYn: 'Y',
    },
    {
      id: 3 + 'pop' + Date.now(),
      type: '부가서비스',
      group: '미디어 서비스',
      marketingName: '저가요금제 사용 넷플릭스 ‘오징어게임2’ 검색',
      userId: 'admin',
      sqlYn: 'N',
    },
  ];
};

attachData();

const emit = defineEmits(['cancel', 'callBeck']);
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
const onConfirmTab01 = () => {
  emit('callBeck', selectedRowsData.value);
  emit('cancel');
};
const onConfirmTab02 = () => {
  emit('callBeck', selectedRows.value);
  emit('cancel');
};

// 체크박스 이벤트
const selectedRows = ref([]);
const selectedRowsData = ref([]);
const selectAll = ref(false);
const selectCnt = ref(0);
const sqlText = ref('');
const isTextEntered = ref(false);

watchEffect(() => {
  selectCnt.value = selectedRows.value.length;
  isTextEntered.value = sqlText.value.trim().length > 0;
});

// //체크박스 전체 선택 할시 주석 해제
// const toggleSelectAll = () => {
//   if (selectAll.value) {
//     selectedRows.value = tableData.value.map(item => item.id);
//   } else {
//     selectedRows.value = [];
//   }
// };

const updateSelectAll = () => {
  selectAll.value = selectedRows.value.length === tableData.value.length;
};

// 행 클릭 시 선택 상태 변경
const onSelectRow = item => {
  const index = selectedRows.value.indexOf(item.id);
  const dataIndex = selectedRowsData.value.findIndex(row => row.id === item.id);
  if (index === -1) {
    selectedRows.value.push(item.id);
    selectedRowsData.value.push({ ...item });
  } else {
    selectedRows.value.splice(index, 1);
    selectedRowsData.value.splice(dataIndex, 1);
  }

  updateSelectAll();
};

// 제외조건 추가 모달
const addCondName = () => {
  condNameChk.value = !condNameChk.value;
};

// SQL이 있는 로우일경우 DB를 한번 더 조회해서 값을 가지고 온다음 SQL을 넣어주세요.
const openViewSqlModal = ref(false);
const targetName = ref('');
const onSqlModal = name => {
  // 여기서 db조회해서 쿼리 가지고 가서 뿌려주셔도 되고
  // 모달에서 조회해서 뿌려도 될것 같아요.
  const query = `예시 쿼리문 이랍니다 !!!!
  SELECT row_count, boardid, username, title,
         content, readcnt, insertdate,
         upperid, sortorder, depth,
         filepath, filename, fileyn
  FROM (
    SELECT rownum as row_count,
           boardid, username, title,
           content, readcnt,
           to_char(insertdate, 'yyyy/mm/dd') as insertdate,
           upperid, sortorder, depth,
           filepath, filename, fileyn
    FROM (
      SELECT * FROM board
      WHERE sortorder is not null
        AND boardid like '%'
    )
    START WITH upperid = 0
    CONNECT BY PRIOR boardid = upperid
  )
  WHERE row_count BETWEEN ? AND ?
  SELECT row_count, boardid, username, title,
         content, readcnt, insertdate,
         upperid, sortorder, depth,
         filepath, filename, fileyn
  FROM (
    SELECT rownum as row_count,
           boardid, username, title,
           content, readcnt,
           to_char(insertdate, 'yyyy/mm/dd') as insertdate,
           upperid, sortorder, depth,
           filepath, filename, fileyn
    FROM (
      SELECT * FROM board
      WHERE sortorder is not null
        AND boardid like '%'
    )
    START WITH upperid = 0
    CONNECT BY PRIOR boardid = upperid
  )
  WHERE row_count BETWEEN ? AND ?
  SELECT row_count, boardid, username, title,
         content, readcnt, insertdate,
         upperid, sortorder, depth,
         filepath, filename, fileyn
  FROM (
    SELECT rownum as row_count,
           boardid, username, title,
           content, readcnt,
           to_char(insertdate, 'yyyy/mm/dd') as insertdate,
           upperid, sortorder, depth,
           filepath, filename, fileyn
    FROM (
      SELECT * FROM board
      WHERE sortorder is not null
        AND boardid like '%'
    )
    START WITH upperid = 0
    CONNECT BY PRIOR boardid = upperid
  )
  WHERE row_count BETWEEN ? AND ?
`;

  targetName.value = name;
  sqlText.value = query;

  openViewSqlModal.value = true;
};
const updateSql = targetId => {
  // DB에서 SQL가지고 왔다고 치고
  const query = `예시 쿼리문 이랍니다 !!!!
  SELECT row_count, boardid, username, title,
         content, readcnt, insertdate,
         upperid, sortorder, depth,
         filepath, filename, fileyn
  FROM (
    SELECT rownum as row_count,
           boardid, username, title,
           content, readcnt,
           to_char(insertdate, 'yyyy/mm/dd') as insertdate,
           upperid, sortorder, depth,
           filepath, filename, fileyn
    FROM (
      SELECT * FROM board
      WHERE sortorder is not null
        AND boardid like '%'
    )
    START WITH upperid = 0
    CONNECT BY PRIOR boardid = upperid
  )
  WHERE row_count BETWEEN ? AND ?
`;

  sqlText.value = query;
  selectTab.value = 2;
};
</script>
