import { useUserStore } from '~/store';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (to.name !== 'index') {
    if (!userStore.token) {
      swalWarning({
        title: 'Vamos com calma...',
        text: 'Faça login para acessar o sistema!',
      });
      return navigateTo('/');
    } else if (to.path.endsWith('/')) {
      const { path } = to;
      const nextPath = path.replace(/\/+$/, '') || '/';
      return navigateTo(nextPath);
    }
  }
  navigateTo(to.path);
});
