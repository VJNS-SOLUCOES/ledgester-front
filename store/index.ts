import { defineStore } from 'pinia';
import type { MenuDto } from '~/types/menu';
import type { UserDto } from '~/types/user';

export const useUserStore = defineStore('user-store', {
  state: () => ({
    token: null as string | null,
    menu: null as MenuDto[] | null,
    user: null as Omit<UserDto, 'menu' | 'token'> | null,
  }),
  actions: {
    setData(data: UserDto) {
      const { token, menu, ...rest } = data;
      this.menu = menu;
      this.token = token;
      this.user = rest;
    },
    clearData() {
      this.menu = null;
      this.token = null;
      this.user = null;
    },
  },
  persist: {
    key: '@LEDGESTER/user-store',
    storage: piniaPluginPersistedstate.localStorage(),
  },
});
