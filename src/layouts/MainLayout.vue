<template>
  <q-layout view="hHr lpR fFf">
    <q-header elevated class="bg-dark text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title> Encurter </q-toolbar-title>
        <q-tabs v-show="!$q.screen.lt.sm" align="right">
          <q-route-tab exact to="/app/tops" label="Tops url" icon="star" />
          <q-route-tab exact to="/app" label="Início" icon="home" />
          <q-route-tab exact to="" label="Conta" icon="person" />
        </q-tabs>

        <q-btn
          v-show="$q.screen.lt.sm"
          dense
          flat
          round
          icon="menu"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const rightDrawerOpen = ref(false);

    return {
      $q,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
