import { defineStore } from 'pinia';

type User = {
  userName: string;
  userId: number | null
};

const useUserStore = defineStore('users', {
  state: (): User => {
    return {
      userName: 'Usuário',
      userId: null
    };
  },
  getters: {
    getCurrentUser(): string {
      return this.userName;
    },
    getUserId(): number | null {
      return this.userId
    }
  },
  actions: {
    setUser(user: string) {
      this.userName = user;
    },
    setId(id : number){
      this.userId = id
    }
  },
});

export default useUserStore;
