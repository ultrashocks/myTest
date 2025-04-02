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
    redirect: '/target',
    meta: { auth: false, navi: false },
  },
  {
    path: '/main',
    component: () => import('@/views/SubRouterView.vue'),
    redirect: '/main',
    name: 'main',
    meta: {
      auth: false,
      navi: true,
      title: '메인',
    },
    children: [
      {
        path: '/main',
        component: () => import('@/views/main/MainView.vue'),
        name: 'Main',
        meta: {
          auth: false,
          navi: true,
          title: '메인',
        },
      },
    ],
  },
  {
    path: '/target',
    component: () => import('@/publishing/SubRouterView.vue'),
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
        component: () => import('@/publishing/target/TargetView.vue'),
        name: 'Target',
        meta: {
          auth: false,
          navi: true,
          title: '타겟관리',
        },
      },
    ],
  },
  {
    path: '/targeting',
    component: () => import('@/publishing/SubRouterView.vue'),
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
        component: () => import('@/publishing/targeting/TargetingView.vue'),
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
    component: () => import('@/publishing/SubRouterView.vue'),
    redirect: '/business',
    name: 'business',
    meta: {
      auth: false,
      navi: true,
      title: '업무지원',
    },
    children: [
      {
        path: '/business',
        component: () =>
          import('@/publishing/business/BusinessSupportView.vue'),
        name: 'Business',
        meta: {
          auth: false,
          navi: true,
          title: '업무지원',
        },
      },
    ],
  },
  {
    path: '/standard',
    component: () => import('@/publishing/SubRouterView.vue'),
    redirect: '/standard',
    name: 'standard',
    meta: {
      auth: false,
      navi: true,
      title: '기준정보관리',
    },
    children: [
      {
        path: '/standard',
        component: () =>
          import('@/publishing/standard/StandardInfoMngView.vue'),
        name: 'Standard',
        meta: {
          auth: false,
          navi: true,
          title: '기준정보관리',
        },
      },
    ],
  },
  {
    path: '/system',
    component: () => import('@/publishing/SubRouterView.vue'),
    redirect: '/system',
    name: 'system',
    meta: {
      auth: false,
      navi: true,
      title: '시스템관리',
    },
    children: [
      {
        path: '/system',
        component: () => import('@/publishing/system/SystemMngView.vue'),
        name: 'System',
        meta: {
          auth: false,
          navi: true,
          title: '시스템관리',
        },
      },
    ],
  },
  // 테스트 페이지 (삭제)
  {
    path: '/test',
    component: () => import('@/publishing/SubRouterView.vue'),
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
        component: () => import('@/publishing/test/TestView.vue'),
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
    component: () => import('@/publishing/NotFoundView.vue'),
    meta: { auth: false, navi: false },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/publishing/NotFoundView.vue'),
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
