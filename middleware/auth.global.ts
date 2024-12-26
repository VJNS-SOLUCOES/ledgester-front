import { useUserStore } from '~/store';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.token && to.name !== 'index') {
    swalWarning({
      title: 'Vamos com calma...',
      text: 'Você precisa estar logado para acessar o sistema!',
    });
    return navigateTo('/');
  }
});
