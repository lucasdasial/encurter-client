import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        component: () =>
          import('components/Auth_components/FormLogin/Index.vue'),
      },
      {
        path: 'register',
        component: () =>
          import('components/Auth_components/FormRegister/Index.vue'),
      },
    ],
  },
  {
    path: '/app',
    // redirect: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'app',
        component: () => import('pages/Home.vue'),
      },
      {
        path: 'tops',
        component: () => import('pages/Top.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
