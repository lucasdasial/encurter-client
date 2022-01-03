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
    redirect: '/app/new',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'new',
        component: () => import('pages/Home.vue'),
      },
      {
        path: 'my-urls',
        component: () => import('src/pages/MyUrls.vue'),
      },
    ],
  },
  {
    path: '/anonymous',
    component: () => import('pages/Anonymous.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
