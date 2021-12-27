import { defineStore } from 'pinia';

type User = {
  userName: string;
};

const useUserStore = defineStore('users', {
  state: (): User => {
    return {
      userName: 'Usuário',
    };
  },
  getters: {
    getCurrentUser(): string {
      return this.userName;
    },
  },
  actions: {
    setUser(user: string) {
      this.userName = user;
    },
  },
});

export default useUserStore;
