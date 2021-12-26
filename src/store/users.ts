import { defineStore } from 'pinia';

type User = {
  userName: string;
};

export default defineStore('users', {
  state: (): User => {
    return {
      userName: 'Anônimo',
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
