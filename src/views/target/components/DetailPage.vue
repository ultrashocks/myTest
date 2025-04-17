<template>
  <div class="contents-wrap">
    <section class="targeting-wrap">
      <div class="top-title detail">
        <div class="inner-block">
          <button class="btn-back">뒤로</button>
          <div class="title">Targeting 상세 정보</div>
          <div class="block-collapse__btns">
            <button class="btn-textR"><i class="open"></i>전체 펼침</button>
            <button class="btn-textR"><i class="close"></i>전체 접힘</button>
          </div>
        </div>
      </div>

      <div class="targeting-contents">
        <div class="detail-view">
          <ul class="accordion">
            <li class="acc-item">
              <div class="acc-title active">
                <span>기본정보<i class="icon"></i></span>
              </div>
              <div class="acc-container">
                <TargetingStep2></TargetingStep2>
              </div>
            </li>
            <li class="acc-item">
              <div class="acc-title active">
                <span>성공기준<i class="icon"></i></span>
              </div>
              <div class="acc-container">
                <TargetingStep3></TargetingStep3>
              </div>
            </li>
            <li class="acc-item">
              <div class="acc-title active">
                <span>상세조건<i class="icon"></i></span>
              </div>
              <div class="acc-container">
                <TargetingStep4></TargetingStep4>
              </div>
            </li>
            <li class="acc-item">
              <div class="acc-title active">
                <span>타겟추천<i class="icon"></i></span>
              </div>
              <div class="acc-container">
                <TargetingStep5></TargetingStep5>
              </div>
            </li>
            <li class="acc-item">
              <div class="acc-title active">
                <span>세그구분<i class="icon"></i></span>
              </div>
              <div class="acc-container">
                <TargetingStep6></TargetingStep6>
              </div>
            </li>
            <li class="acc-item">
              <div class="acc-title active">
                <span>일정/연동타겟<i class="icon"></i></span>
              </div>
              <div class="acc-container">
                <TargetingStep8></TargetingStep8>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const { step1 } = toRefs(props.modelValue);

import { ref } from 'vue';
import TargetingStep2 from '@/views/target/components/detail/BasicInfo.vue';
import TargetingStep3 from '@/views/target/components/detail/Success.vue';
import TargetingStep4 from '@/views/targeting/components/step4/StageStep4.vue';
import TargetingStep5 from '@/views/target/components/detail/Recommend.vue';
import TargetingStep6 from '@/views/target/components/detail/Seg.vue';
import TargetingStep8 from '@/views/target/components/detail/Schedule.vue';

const selectCheckValues = ref([]);
const selectedCheckData = ref({});
const filterData = ref([]);
const attachData = () => {
  filterData.value = [
    {
      id: 1,
      open: true,
      itemtype: '타겟 유형',
      sub: [
        {
          title: '구분',
          sub2: [
            { id: 1, title: '자사' },
            { id: 2, title: '타사' },
          ],
        },
        {
          title: '서비스',
          sub2: [
            { id: 3, title: '모바일' },
            { id: 4, title: '인터넷' },
            { id: 5, title: 'TV' },
            { id: 6, title: '스마트홈' },
            { id: 7, title: '기타' },
          ],
        },
        {
          title: '상품유형',
          sub2: [
            { id: 8, title: '요금제' },
            { id: 9, title: '부가서비스' },
            { id: 10, title: '단말' },
            { id: 11, title: '기타' },
          ],
        },
        {
          title: '업무구분',
          sub2: [
            { id: 12, title: '신규가입' },
            { id: 13, title: '상품변경' },
            { id: 14, title: '약정갱신' },
            { id: 15, title: '해지방어' },
            { id: 16, title: '관계형성' },
            { id: 17, title: '단순안내' },
          ],
        },
        {
          title: '업무상세',
          sub2: [
            { id: 18, title: '기가업셀' },
            { id: 19, title: '기타' },
          ],
        },
      ],
    },
    {
      id: 2,
      open: true,
      itemtype: '채널유형',
      sub: [
        {
          title: '채널구분',
          sub2: [
            { id: 20, title: '디지털' },
            { id: 21, title: '고객센터' },
            { id: 22, title: '매장' },
          ],
        },
      ],
    },
    {
      id: 3,
      open: true,
      itemtype: '타겟 일정',
      sub: [
        {
          title: '실행주기',
          sub2: [
            { id: 23, title: '매월' },
            { id: 24, title: '매주' },
            { id: 25, title: '매일' },
            { id: 26, title: '한번만' },
          ],
        },
      ],
    },
    {
      id: 4,
      open: true,
      itemtype: '연동 유무',
      sub: [
        {
          title: '연동타겟',
          sub2: [
            { id: 27, title: '있음' },
            { id: 28, title: '없음' },
          ],
        },
        {
          title: '연동 CMS',
          sub2: [
            { id: 29, title: '있음' },
            { id: 30, title: '없음' },
          ],
        },
      ],
    },
  ];
};

attachData();
</script>
