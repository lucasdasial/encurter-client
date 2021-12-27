import { boot } from 'quasar/wrappers';
import { SessionStorage } from 'quasar';

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.requiresAuth;
    if (requiresAuth) {
      const token = SessionStorage.getItem('token');
      token ? next() : next('/login');
      return;
    }
    next();
  });
});
