<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view">
          <div class="notice-view">
            <div class="notice-view-header">
              <div class="heaer-top">
                <div class="title">{{ noticeData.title }}</div>
              </div>
              <div class="header-bottom">
                <ul>
                  <li class="user">{{ noticeData.user }}</li>
                  <li class="views">
                    조회수
                    <span class="views-value">{{ noticeData.views }}</span>
                  </li>
                  <li class="date">
                    작성일
                    <span class="date-value">{{ noticeData.writeDate }}</span>
                  </li>
                  <li class="period" v-if="noticeData.important">
                    <span class="status-icon">중요</span>
                    게시기간
                    <span class="period-value">{{ noticeData.period }}</span>
                  </li>
                  <li class="exposure" v-if="noticeData.exposure">
                    <i class="exposure-icon"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div class="notice-view-body">
              <div class="notice-view-body-files">
                <ul>
                  <li v-for="file in noticeData.files" :key="file.name">
                    <a :href="file.url" target="_blank"
                      ><i class="icon"></i>{{ file.name }} ({{
                        file.size
                      }}KB)</a
                    >
                  </li>
                </ul>
              </div>
              <div
                class="notice-view-body-content"
                v-html="noticeData.content"
              ></div>
            </div>
            <div class="notice-view-footer">
              <div class="footer-next">
                <div class="label">다음</div>
                <div class="title">
                  <div class="title-text">
                    {{
                      noticeData.next.title === ''
                        ? '다음 글이 없습니다.'
                        : noticeData.next.title
                    }}
                  </div>
                </div>
              </div>
              <div class="footer-prev">
                <div class="label">이전</div>
                <div class="title">
                  <div class="title-text">
                    {{
                      noticeData.prev.title === ''
                        ? '이전 글이 없습니다.'
                        : noticeData.prev.title
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-btns__controls footer-button-box">
              <div class="btn-l">
                <button @click="onList">목록</button>
              </div>
              <div class="btn-r">
                <button @click="onDelete">삭제</button>
                <button @click="onEdit">수정</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- Confrim창 -->
    <AppDialog
      v-model:view="confirmState.view"
      :title="confirmState.title"
      :message="confirmState.message"
      @confirm="onConfrim"
    />
  </div>
</template>

<script setup>
import AppDialog from '@/components/ui/AppDialog.vue';
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);
const router = useRouter();
const noticeData = reactive({
  title: '',
  user: '',
  views: 0,
  writeDate: '',
  status: '',
  period: '',
  exposure: false,
  files: [],
  content: '',
  prev: {
    title: '',
    url: '',
  },
  next: {
    title: '',
    url: '',
  },
});

const attachData = () => {
  noticeData.title = 'AI 추천 서비스 개선 안내';
  noticeData.user = '김유플(uplusadmin)';
  noticeData.views = 120;
  noticeData.writeDate = '2025-05-10';
  noticeData.important = true;
  noticeData.period = '2025-05-10 ~ 2025-05-10';
  noticeData.exposure = true;
  noticeData.files = [
    {
      name: 'AI 추천 추가 세그 항목_20250510.xls',
      url: 'AI 추천 추가 세그 항목_20250510.xls',
      size: 328,
    },
    {
      name: 'AI 추천 서비스 이용안내_v2.0.pdf',
      url: 'AI 추천 서비스 이용안내_v2.0.pdf',
      size: 100,
    },
  ];
  noticeData.content = `시스템 서비스 개선에 대한 추가 공지입니다.<br>
자세한 사항은 첨부파일을 참고해 주시기 바랍니다.<br>
<br>

[개선 사항]<br>
1. 성공지표 기준과 목표값 제공<br>
  &nbsp;&nbsp;&nbsp;- 성공지표명 제공에서 성공지표 기준과 목표값이 추가되었습니다.<br>

2. 세그 구분 정확도 상승<br>
  &nbsp;&nbsp;&nbsp;- 약 30개의 세그가 추가 되어 고객 성향 분석의 정확도가 상승되어 제공됩니다.`;
  noticeData.prev.title =
    '25년 6월 18(수) 서비스 점겸으로 인한 신규 타겟 등록 사용 제한 안내(07:00 ~ 09:00)';
  noticeData.prev.url = '';
  noticeData.next.title = '';
  noticeData.next.url = '';
};

attachData();

const onNext = () => {
  console.log('next');
};
const onPrev = () => {
  console.log('prev');
};
const onEdit = () => {
  router.push('/system/notice/write');
};
const onList = () => {
  router.push('/business/menu1');
};

// Confrim창
const confirmState = reactive({
  view: false,
  title: '확인',
  message: `게시물을 삭제하시겠습니까?`,
});
const onConfrim = () => {
  alert('확인 실행');
};
const onDelete = () => {
  confirmState.view = true;
};
</script>
