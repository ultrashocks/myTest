<template>
  <div class="seg-items-page ai-page">
    <div class="ai-page-inner">
      <div class="seg-deps1">
        <div class="deps1-box-list">
          <div class="d-flex deps-row">
            <div class="deps1-box deps-box">
              <div class="deps1-box-header box-header">
                전체 타겟 수
                <div class="btn-add-deps" @click="onFirstSegAddModal(9999)">
                  <i
                    class="icon"
                    :class="
                      groupList2deps[0].rowObj.length > 0 ? 'icon-add-seg' : ''
                    "
                  ></i>
                </div>
              </div>
              <div class="deps1-box-body box-body">
                <span>25,000</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="seg-deps2"
          v-for="(group, groupIndex) in groupList2deps"
          :key="groupIndex"
        >
          <!-- 리스트가 뎁스에 따라 반복된다. -->
          <div
            class="deps2-box-list d-flex"
            v-for="(item, deps2index) in group.rowObj"
            :key="deps2index"
          >
            <div class="d-flex deps-row">
              <div class="delete-deps" v-if="deps2index === 0">
                <div class="btn-add-deps" @click="removeSeg02Deps">
                  <i class="icon"></i>
                </div>
              </div>
              <div class="deps-line">
                <!-- 첫번째 deps2-box-list 부터 생김-->
                <div class="line"></div>
              </div>
              <div class="deps2-box">
                <div class="deps-box">
                  <div class="deps2-box-header box-header">
                    {{ item.segTitle }}
                    <div
                      class="btn-add-deps"
                      @click="onSegAddModal(deps2index, item.deps03)"
                    >
                      <i
                        class="icon"
                        :class="item.deps03.length > 0 ? 'icon-add-seg' : ''"
                      ></i>
                    </div>
                  </div>
                  <div class="deps2-box-body box-body">
                    {{ item.targetUserCnt }}
                  </div>
                </div>
              </div>
            </div>
            <div class="seg-deps3">
              <!-- 리스트가 뎁스에 따라 반복된다. -->
              <div
                class="deps3-box-list"
                v-for="(deps03row, index) in item.deps03"
                :key="index"
              >
                <div class="d-flex deps-row">
                  <div class="delete-deps" v-if="index === 0">
                    <div
                      class="btn-add-deps"
                      @click="removeSeg03Deps(deps2index)"
                    >
                      <i class="icon"></i>
                    </div>
                  </div>
                  <div class="deps-line">
                    <div class="line"></div>
                  </div>
                  <div class="deps3-box">
                    <div class="deps-box">
                      <div class="deps3-box-header box-header">
                        {{ deps03row.name }}
                      </div>
                      <div class="deps3-box-body box-body">
                        {{ deps03row.cnt }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 제한조건 추가 모달 -->
    <AppWindow v-model:view="toggleModal" width="900px" height="676px">
      <AddSegChoice
        v-model:groupIndex="groupIndex"
        @callBeck="callModalData"
        @cancel="toggleModal = false"
      />
    </AppWindow>
  </div>
</template>

<script setup>
import AppWindow from '@/components/ui/AppWindow.vue';

const props = defineProps({});

import { nextTick, ref } from 'vue';
import AddSegChoice from '@/views/targeting/components/step6/components/modals/AddSegChoiceModal.vue';

// 모달 시작
// 제한조건 추가 모달 시작
const toggleModal = ref(false);

const groupIndex = ref(0);
const deps3arr = ref([]);

const groupList2deps = ref([
  {
    rowObj: [],
  },
]);

const onFirstSegAddModal = idx => {
  groupIndex.value = idx;
  toggleModal.value = true;
};
const onSegAddModal = (index, deps03) => {
  groupIndex.value = index;
  deps3arr.value = deps03;
  toggleModal.value = true;
};

const callModalData = (data, groupIndex) => {
  let result = [];

  //data.detailData 이 파라미터가 있는지 없는지로 어떤 모달의 파라미터인지 체크합니다.
  if (data.detailData) {
    if (data.detailData.code === 'C00000111') {
      // 5살 단위 그룹
      result = [
        { id: 5, label: '5대 이하' },
        { id: 10, label: '10대' },
        { id: 15, label: '15대' },
        { id: 20, label: '20대' },
        { id: 25, label: '25대' },
        { id: 30, label: '30대' },
        { id: 35, label: '35대' },
        { id: 40, label: '40대' },
        { id: 45, label: '45대' },
        { id: 50, label: '50대' },
        { id: 55, label: '55대' },
        { id: 60, label: '60대 이상' },
      ];
    } else if (data.detailData.code === 'C00000112') {
      result = [
        { id: 10, label: '10대 이하' },
        { id: 20, label: '20대' },
        { id: 30, label: '30대' },
        { id: 40, label: '40대' },
        { id: 50, label: '50대' },
        { id: 60, label: '60대 이상' },
      ];
    } else if (data.detailData.code === 'C00000211') {
      result = [
        { id: 1, label: '남성' },
        { id: 2, label: '여성' },
      ];
    } else {
      result = [
        { id: 100001, label: '테스트1' },
        { id: 100020, label: '테스트2' },
        { id: 200030, label: '테스트3' },
        { id: 300400, label: '테스트4' },
        { id: 400050, label: '테스트5' },
        { id: 500060, label: '테스트6' },
      ];
    }
  } else if (data.customSegData) {
    console.log(data.customSegData);
    data.customSegData.forEach((row, idx) => {
      const dataArr = {
        id: row.id || 0,
        label: row.name || '고객세그' + idx,
        cnt: row.cnt,
      };
      result.push(dataArr);
    });
    // groupIndex 가 9999면 2뎁스
  }

  if (groupIndex === 9999) {
    console.log('2뎁스');
    // 기존에 2뎁스 데이터가 있으면 삭제
    const target = groupList2deps.value?.[0];
    if (target) {
      target.rowObj = [];
    }
    result.forEach(row => {
      const dataArr = {
        id: row.id || 0,
        segTitle: row.label,
        targetUserCnt: row.cnt || 100,
        deps03: [],
      };
      groupList2deps.value[0].rowObj.push(dataArr);
    });
  } else {
    console.log('3뎁스');
    const target = groupList2deps.value?.[0]?.rowObj?.[groupIndex];
    if (target) {
      target.deps03 = [];
    }
    result.forEach(row => {
      const dataArr = {
        id: row.id || 0,
        name: row.label,
        cnt: row.cnt || 100,
      };
      groupList2deps.value[0].rowObj[groupIndex].deps03.push(dataArr);
    });
  }
};

const removeSeg02Deps = () => {
  groupList2deps.value[0].rowObj = [];
};
const removeSeg03Deps = groupIndex => {
  groupList2deps.value[0].rowObj[groupIndex].deps03 = [];
};
</script>
