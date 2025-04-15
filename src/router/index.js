import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { useSpinner } from '@/composables/spinner';
import { useAlert } from '@/composables/alert';

export const getRoutes = [
  {
    path: '/',
    redirect: '/main',
    meta: { auth: false, navi: false },
  },
  {
    path: '/main',
    component: () => import('@/views/SubRouterView.vue'),
    redirect: '/main',
    name: 'main',
    meta: {
      auth: false,
      navi: false,
      title: '메인',
    },
    children: [
      {
        path: '/main',
        component: () => import('@/views/main/MainView.vue'),
        name: 'Main',
        meta: {
          auth: false,
          navi: false,
          title: '메인',
        },
      },
    ],
  },
  {
    path: '/target',
    component: () => import('@/views/SubRouterView.vue'),
    redirect: '/target',
    name: 'target',
    meta: {
      auth: false,
      navi: true,
      title: '타겟관리',
    },
    children: [
      {
        path: '/target',
        component: () => import('@/views/target/TargetView.vue'),
        name: 'Target',
        meta: {
          auth: false,
          navi: true,
          title: '타겟관리',
        },
      },
      {
        path: 'update/:id',
        component: () =>
          import('@/views/target/components/UpdatePage.vue'),
        name: 'TargetUpdate',
        meta: {
          auth: false,
          navi: true,
          title: '타겟 관리 수정',
        },
      },
      {
        path: 'detail/:id',
        component: () =>
            import('@/views/target/components/DetailPage.vue'),
        name: 'TargetUpdate',
        meta: {
          auth: false,
          navi: true,
          title: '타겟 상세',
        },
      },
    ],
  },
  {
    path: '/targeting',
    component: () => import('@/views/SubRouterView.vue'),
    redirect: '/targeting',
    name: 'targeting',
    meta: {
      auth: false,
      navi: true,
      title: '타겟팅',
    },
    children: [
      {
        path: '/targeting',
        component: () => import('@/views/targeting/TargetingView.vue'),
        name: 'Targeting',
        meta: {
          auth: false,
          navi: true,
          title: '타겟팅',
        },
      },
    ],
  },
  {
    path: '/business',
    component: () => import('@/views/SubRouterView.vue'),
    redirect: '/business/menu1',
    name: 'business',
    meta: {
      auth: false,
      navi: true,
      title: '업무지원',
    },
    children: [
      {
        path: '/business/menu1',
        component: () => import('@/views/business/BusinessMenu1View.vue'),
        name: 'detailBoard',
        meta: {
          auth: false,
          navi: true,
          title: '공지사항',
        },
        children: [
          {
            path: '/business/menu1/:targetId',
            component: () =>
              import(
                '@/views/business/components/BusinessMenu1/NoticeDetailView.vue'
              ),
            name: 'menu1',
            meta: {
              auth: false,
              navi: true,
              title: '공지사항 상세',
            },
          },
        ],
      },
      {
        path: '/business/menu2',
        component: () => import('@/views/business/BusinessMenu2View.vue'),
        name: 'menu2',
        meta: {
          auth: false,
          navi: true,
          title: '메뉴얼',
        },
      },
      // {
      //   path: '/business/menu3',
      //   component: () => import('@/views/business/BusinessMenu3View.vue'),
      //   name: 'menu3',
      //   meta: {
      //     auth: false,
      //     navi: true,
      //     title: '업무지원 메뉴3',
      //   },
      // },
      {
        path: '/business/menu4',
        component: () => import('@/views/business/BusinessMenu4View.vue'),
        name: 'menu4',
        meta: {
          auth: false,
          navi: true,
          title: 'Q&A (소셜데스크)',
          isButton: true,
        },
      },
      {
        path: '/business/menu5',
        component: () => import('@/views/business/BusinessMenu5View.vue'),
        name: 'menu5',
        meta: {
          auth: false,
          navi: true,
          title: '데이터 레이크',
          isButton: true,
        },
      },
    ],
  },
  {
    path: '/standard',
    component: () => import('@/views/SubRouterView.vue'),
    redirect: '/standard/basic',
    name: 'standard',
    meta: {
      auth: false,
      navi: true,
      title: '기준정보관리',
    },
    children: [
      {
        path: '/standard/basic',
        component: () => import('@/views/standard/BasicTargetView.vue'),
        name: 'Basic',
        meta: {
          auth: false,
          navi: true,
          title: '기본 타겟유형 관리',
        },
      },
      {
        path: '/standard/success',
        component: () => import('@/views/standard/SuccessAssistanceView.vue'),
        name: 'Success',
        meta: {
          auth: false,
          navi: true,
          title: '성공/보조지표 관리',
        },
      },
      {
        path: '/standard/exclude',
        component: () => import('@/views/standard/ExcludeLimitsView.vue'),
        name: 'Exclude',
        meta: {
          auth: false,
          navi: true,
          title: '제외/제한조건 관리',
        },
      },
      {
        path: '/standard/seg',
        component: () => import('@/views/standard/SegmentationView.vue'),
        name: 'Seg',
        meta: {
          auth: false,
          navi: true,
          title: '세그구분 관리',
        },
      },
    ],
  },
  {
    path: '/system',
    component: () => import('@/views/SubRouterView.vue'),
    redirect: '/system/notice/',
    name: 'System',
    meta: {
      auth: false,
      navi: true,
      title: '시스템 관리',
    },
    children: [
      {
        path: '/system/notice/',
        component: () => import('@/views/SubRouterInnerView.vue'),
        redirect: '/system/notice/view',
        name: '공지사항',
        meta: {
          auth: false,
          navi: true,
          title: '공지사항 관리',
        },
        children: [
          {
            path: '/system/notice/view',
            component: () => import('@/views/system/NoticeDetailView.vue'),
            name: '공지사항 보기',
            meta: {
              auth: false,
              navi: true,
              title: '공지사항 관리',
            },
          },
          {
            path: '/system/notice/write',
            component: () => import('@/views/system/NoticeWriteView.vue'),
            name: '공지사항 등록/수정',
            meta: {
              auth: false,
              navi: false,
              title: '공지사항 관리',
            },
          },
        ],
      },

      {
        path: '/system/manual',
        component: () => import('@/views/system/ManualMngView.vue'),
        name: 'Manual',
        meta: {
          auth: false,
          navi: true,
          title: '메뉴얼 관리',
        },
      },
      {
        path: '/system/user',
        component: () => import('@/views/system/UserSearchView.vue'),
        name: 'User',
        meta: {
          auth: false,
          navi: true,
          title: '사용자 조회',
        },
      },
      {
        path: '/system/menu',
        component: () => import('@/views/system/MenuMngView.vue'),
        name: 'Menu',
        meta: {
          auth: false,
          navi: true,
          title: '메뉴 관리',
        },
      },
      {
        path: '/system/program',
        component: () => import('@/views/system/ProgramMngView.vue'),
        name: 'Program',
        meta: {
          auth: false,
          navi: true,
          title: '프로그램 목록 관리',
        },
      },
      {
        path: '/system/code',
        component: () => import('@/views/system/CommonCodeMngView.vue'),
        name: 'Code',
        meta: {
          auth: false,
          navi: true,
          title: '공통코드 관리',
        },
      },
    ],
  },
  // 테스트 페이지 (삭제)
  {
    path: '/test',
    component: () => import('@/views/SubRouterView.vue'),
    redirect: '/test',
    name: 'test',
    meta: {
      auth: false,
      navi: false,
      title: '테스트',
    },
    children: [
      {
        path: '/test',
        component: () => import('@/views/test/TestView.vue'),
        name: 'Test',
        meta: {
          auth: false,
          navi: false,
          title: 'test',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { auth: false, navi: false },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFoundView.vue'),
    redirect: '/404',
    meta: { auth: false, navi: false },
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  // history: createWebHashHistory(),
  routes: getRoutes,
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

const data = [
  {
    id: 1,
    itemtype: '타겟 유형',
    sub: [
      { title: '구분', sub: [{ title: '자사' }, { title: '타사' }] },
      { title: '서비스', sub: [] },
    ],
    checkvalue: '모바일',
  },
];

router.beforeEach((to, from, next) => {
  //Spinner
  const { setSpinnerStatus } = useSpinner();
  //Alert
  const { setAlertStatus } = useAlert();

  console.log(to.name);
  console.log({ to });

  setSpinnerStatus(false);
  setAlertStatus({ view: false, message: '' });
  next();
});

export default router;
