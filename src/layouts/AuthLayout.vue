<template>
  <q-layout>
    <q-header class="bg-grey-3 text-grey-9">
      <q-toolbar>
        <q-toolbar-title class="text-grey-9">
          <q-avatar> </q-avatar>

          Encurter
        </q-toolbar-title>

        <q-tabs
          inline-label
          indicator-color="orange"
          align="right"
          v-model="tab"
        >
          <q-route-tab
            name="login"
            to="/login"
            exact
            label="Fazer Login"
            icon="login"
          />
          <q-route-tab
            name="register"
            to="/register"
            exact
            label="Cadastra-se"
            icon="person_add"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page class="row items-center justify-evenly">
      <router-view />
    </q-page>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    return {
      tab: ref('login'),
    };
  },
});
</script>
