<template>
  <q-layout view="hHr lpR fFf">
    <q-header class="bg-grey-3 text-grey-9" height-hint="98">
      <q-toolbar>
        <q-toolbar-title> Bem vindo <strong class="text-orange">{{userStore.getCurrentUser}}</strong>! </q-toolbar-title>
        <q-tabs
          v-show="!$q.screen.lt.sm"
          align="right"
          indicator-color="orange"
        >
          <q-route-tab
            exact
            to="/app/new"
            label="nova url"
            icon="add_circle_outline"
            style="width: 120px"
          />
          <q-route-tab
            exact
            to="/app/my-urls"
            label="minhas urls"
            icon ="link"
            style="width: 120px"
          />

          <q-route-tab
            exact
            to=""
            label="+ ações"
            icon="manage_accounts"
            style="width: 120px"
          >
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <h6 class="text-center text-capitalize">
                {{ userStore.getCurrentUser }}
              </h6>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section @click="onLogout">
                    <q-icon name="logout" color="orange" />
                    Sair da conta
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-route-tab>
        </q-tabs>

        <q-btn
          v-show="$q.screen.lt.sm"
          dense
          flat
          round
          color="orange"
          icon="menu"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      elevated
      class="bg-grey-3 column justify-between"
    >
      <!-- drawer content -->
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          to="/app/new"
          active-class="text-orange text-bold"
        >
          <q-item-section>Início / Nova url</q-item-section>
          <q-item-section avatar>
            <q-avatar rounded color="orange" text-color="white" icon="add_circle_outline" />
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to="/app/my-urls"
          active-class="text-orange text-bold"
        >
          <q-item-section>Minhas Ulrs</q-item-section>
          <q-item-section avatar>
            <q-avatar rounded color="orange" text-color="white" icon="link" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-item class="q-pa-lg" v-close-popup>
        <q-btn
          @click="onLogout"
          class="full-width bg-orange text-white"
          icon="logout"
        >
          <p class="q-mx-sm">Sair da Conta</p>
        </q-btn>
      </q-item>
    </q-drawer>

    <q-page-container>
      <transition appear enter-active-class="animated fadeIn slower delay-1s">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar, SessionStorage } from 'quasar';
import { useRouter } from 'vue-router';
import useUserStore from 'src/store/users';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const $q = useQuasar();
    const rightDrawerOpen = ref(false);

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    };

    const onLogout = () => {
      $q.notify({
        timeout: 2800,
        message: `Bye, bye até a próxima ${userStore.getCurrentUser}!`,
        type: 'info',
        position: 'top',
      });
      if (rightDrawerOpen.value == true) {
        toggleRightDrawer();
      }
      userStore.$state.userName = 'Usuário';
      setTimeout(() => {
        void router.push('/login');
      }, 3500);

      SessionStorage.remove('token');
    };

    return {
      $q,
      userStore,
      rightDrawerOpen,
      toggleRightDrawer,
      onLogout,
    };
  },
});
</script>
