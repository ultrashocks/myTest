<template>
  <div class="seg-items-page ai-page">
    <div class="ai-page-inner">
      <div class="seg-deps1">
        <div class="deps1-box-list">
          <div class="d-flex deps-row">
            <div class="deps1-box deps-box">
              <div class="deps1-box-header box-header">전체 타겟 수</div>
              <div class="deps1-box-body box-body">
                <span>30,000</span>
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
                    <div class="seg-btn" @click="toggleActive($event)">
                      고객특성
                      <div class="tip-box">
                        <div class="tip-header">
                          {{ item.btn1title }}
                          <div class="btn-tip-close" @click="closeTipBox"></div>
                        </div>
                        <div class="tip-body">
                          {{ item.btn1InfoText }}
                        </div>
                      </div>
                    </div>

                    <div class="seg-btn" @click="toggleActive($event)">
                      타겟팅 TIP
                      <div class="tip-box">
                        <div class="tip-header">
                          {{ item.btn2title }}
                          <div class="btn-tip-close" @click="closeTipBox"></div>
                        </div>
                        <div class="tip-body">{{ item.btn2InfoText }}</div>
                      </div>
                    </div>
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
                  <div class="delete-deps3" v-if="index === 0">
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
    <AppWindow v-model:view="toggleModal" width="895px" height="676px">
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

const toggleActive = event => {
  const clickedBtn = event.currentTarget;
  const parentBox = clickedBtn.closest('.deps2-box-body');
  const allBtns = parentBox.querySelectorAll('.seg-btn');

  allBtns.forEach(btn => btn.classList.remove('active'));

  nextTick(() => {
    if (!clickedBtn.classList.contains('active')) {
      clickedBtn.classList.add('active');
    }
  });
};

const closeTipBox = event => {
  const tipBox = event.target.closest('.tip-box');
  const parentBtn = tipBox?.closest('.seg-btn');

  if (parentBtn) {
    setTimeout(() => {
      parentBtn.classList.remove('active');
    }, 0);

    parentBtn.classList.remove('active');
  }
};

// 모달 시작
// 제한조건 추가 모달 시작
const toggleModal = ref(false);

const groupIndex = ref(0);
const deps3arr = ref([]);

// const groupList2deps = ref([
//   {
//     rowObj: [],
//   },
// ]);

// 최초 AI가 값을 넣어줄떄 여기에 넣어주세요.
const groupList2deps = ref([
  {
    rowObj: [
      {
        id: 1,
        segTitle: '게임 관심 고객',
        targetUserCnt: '15,000',
        btn1title: '게임 관심 고객',
        btn1InfoText:
          '최근 한 달 게임 접속일수가 전체 평균 대비 1.8배 높고, 게임 웹앱 접속일 수도 평균 대비 1.2배 높아 상위 10%에 속하는 고객입니다.',
        btn2title: '게임 관심 고객',
        btn2InfoText:
          '온 가족이 데이터 걱정 없이 디즈니플러스와 유튜브를 즐길 수 있도록 인터넷 상품 가입을 추천하세요! 가족 구성원 중 한 분이 데이터 부족으로 불편을 겪고 있으니, 모바일 요금제와 결합하면 혜택을 누릴 수 있다는 점을 강조하세요. 결합 시 받을 수 있는 할인 금액이나 추가 혜택을 구체적으로 제시하는 것이 좋습니다. 인터넷과 TV 결합 상품 가입 시, 디즈니플러스와 쿠팡플레이를 끊김 없이 더 큰 화면으로 즐길 수 있는 태블릿 PC를 무료로 드립니다.',
        deps03: [],
      },
      {
        id: 2,
        segTitle: '재테크 관심 고객',
        targetUserCnt: '8,000',
        btn1title: '재테크 관심 고객',
        btn1InfoText:
          '최근 한 달 게임 접속일수가 전체 평균 대비 1.8배 높고, 게임 웹앱 접속일 수도 평균 대비 1.2배 높아 상위 10%에 속하는 고객입니다.',
        btn2title: '재테크 관심 고객',
        btn2InfoText:
          '온 가족이 데이터 걱정 없이 디즈니플러스와 유튜브를 즐길 수 있도록 인터넷 상품 가입을 추천하세요! 가족 구성원 중 한 분이 데이터 부족으로 불편을 겪고 있으니, 모바일 요금제와 결합하면 혜택을 누릴 수 있다는 점을 강조하세요. 결합 시 받을 수 있는 할인 금액이나 추가 혜택을 구체적으로 제시하는 것이 좋습니다. 인터넷과 TV 결합 상품 가입 시, 디즈니플러스와 쿠팡플레이를 끊김 없이 더 큰 화면으로 즐길 수 있는 태블릿 PC를 무료로 드립니다.',
        deps03: [],
      },
      {
        id: 3,
        segTitle: '데이터 고 사용 고객',
        targetUserCnt: '7,000',
        btn1title: '데이터 고 사용 고객',
        btn1InfoText:
          '최근 한 달 게임 접속일수가 전체 평균 대비 1.8배 높고, 게임 웹앱 접속일 수도 평균 대비 1.2배 높아 상위 10%에 속하는 고객입니다.',
        btn2title: '데이터 고 사용 고객',
        btn2InfoText:
          '온 가족이 데이터 걱정 없이 디즈니플러스와 유튜브를 즐길 수 있도록 인터넷 상품 가입을 추천하세요! 가족 구성원 중 한 분이 데이터 부족으로 불편을 겪고 있으니, 모바일 요금제와 결합하면 혜택을 누릴 수 있다는 점을 강조하세요. 결합 시 받을 수 있는 할인 금액이나 추가 혜택을 구체적으로 제시하는 것이 좋습니다. 인터넷과 TV 결합 상품 가입 시, 디즈니플러스와 쿠팡플레이를 끊김 없이 더 큰 화면으로 즐길 수 있는 태블릿 PC를 무료로 드립니다.',
        deps03: [],
      },
    ],
  },
]);

const onSegAddModal = (index, deps03) => {
  groupIndex.value = index;
  deps3arr.value = deps03;
  toggleModal.value = true;
};

const callModalData = (data, groupIndex) => {
  // 기존에 데이터가 있으면 삭제
  groupList2deps.value[0].rowObj[groupIndex].deps03 = [];

  // 가지고 온 값으로 파싱
  console.log(data.detailData.code);
  // 가지고온 코드로 무슨 그룹인치 체크 해서 그거에 맞게 배열을 조회해서 만들어줍니다.
  let result = [];
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
      { id: 30040, label: '테스트4' },
      { id: 400050, label: '테스트5' },
      { id: 500060, label: '테스트6' },
    ];
  }

  result.forEach(row => {
    console.log(row);
    const dataArr = {
      id: row.id || 0,
      name: row.label,
      cnt: 100,
    };
    groupList2deps.value[0].rowObj[groupIndex].deps03.push(dataArr);
  });
};

const removeSeg03Deps = groupIndex => {
  groupList2deps.value[0].rowObj[groupIndex].deps03 = [];
};
</script>
