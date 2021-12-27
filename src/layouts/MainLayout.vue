<template>
  <q-layout view="hHr lpR fFf">
    <q-header class="bg-grey-3 text-grey-9" height-hint="98">
      <q-toolbar>
        <q-toolbar-title> Encurter </q-toolbar-title>
        <q-tabs
          v-show="!$q.screen.lt.sm"
          align="right"
          indicator-color="orange"
        >
          <q-route-tab
            exact
            to="/app/home"
            label="Início"
            icon="home"
            style="width: 100px"
          />
          <q-route-tab
            exact
            to="/app/tops"
            label="Tops url"
            icon="star"
            style="width: 100px"
          />

          <q-route-tab
            exact
            to=""
            :label="userStore.getCurrentUser"
            icon="account_circle"
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
          to="/app/home"
          active-class="text-orange text-bold"
        >
          <q-item-section>Início</q-item-section>
          <q-item-section avatar>
            <q-avatar rounded color="orange" text-color="white" icon="home" />
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to="/app/tops"
          active-class="text-orange text-bold"
        >
          <q-item-section>Tops Url</q-item-section>
          <q-item-section avatar>
            <q-avatar rounded color="orange" text-color="white" icon="star" />
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
