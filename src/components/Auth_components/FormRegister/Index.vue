<template>
  <div class="row items-center justify-evenly">
    <main class="q-pa-md" style="max-width: 400px">
      <p class="text-h5 text-orange q-mb-lg">Criar uma conta</p>
      <q-form
        action="http://localhost:3333"
        method="POST"
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          filled
          name="login"
          v-model="state.login"
          label="Usuário *"
          color="orange"
          hint="preencha com seu usuário cadastrado"
        >
          <template v-slot:prepend>
            <q-icon name="person" color="orange" />
          </template>
        </q-input>

        <q-input
          v-model="state.password"
          filled
          name="password"
          label="Senha"
          color="orange"
          :type="state.isPwd ? 'password' : 'text'"
        >
          <template v-slot:prepend>
            <q-icon name="key" color="orange" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="state.isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="state.isPwd = !state.isPwd"
            />
          </template>
        </q-input>
        <q-input
          v-model="state.password"
          filled
          name="password"
          label="Repita a senha"
          color="orange"
          :type="state.isPwd ? 'password' : 'text'"
        >
          <template v-slot:prepend>
            <q-icon name="key" color="orange" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="state.isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="state.isPwd = !state.isPwd"
            />
          </template>
        </q-input>

        <div>
          <q-btn
            label="Entrar"
            type="submit"
            color="orange"
            class="full-width"
          />
        </div>
      </q-form>
    </main>
    <img src="~assets/register.svg" alt="ilustração" style="width: 50%" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'FormLogin',

  setup() {
    const state = reactive({ login: '', password: '', isPwd: true });
    const onSubmit = async () => {
      await fetch('http://localhost:3333', {
        method: 'POST',
        body: JSON.stringify({
          login: state.login,
          password: state.password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((date) => console.log(date));
    };
    const handleClickAnonymous = async () => {
      await fetch('http://localhost:3333/anonymous', {
        method: 'POST',
        body: JSON.stringify({
          login: state.login,
          password: state.password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((date) => console.log(date));
    };

    return {
      onSubmit,
      handleClickAnonymous,
      state,
    };
  },
});
</script>
