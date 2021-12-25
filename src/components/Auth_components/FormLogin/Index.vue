<template>
  <div class="row items-center justify-evenly">
    <img src="~assets/welcome.svg" alt="Bem vindo" style="width: 50%" />
    <main class="q-pa-md" style="max-width: 400px">
      <p class="text-h5 text-orange">Login</p>
      <p class="text-subtitle1">Entre com sua conta cadastrada</p>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          name="login"
          v-model="state.login"
          label="Usuário"
          color="orange"
          hint="preencha com seu usuário cadastrado"
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
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
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
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
          <router-link exact to="/app">
            <q-btn
              label="entrar modo anônimo"
              @click="handleClickAnonymous"
              color="grey"
              flat
              class="q-mt-sm full-width"
            />
          </router-link>
        </div>
      </q-form>
      <p>{{ state.login }}</p>
      {{ state.password }}
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FormLogin',

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const state = reactive({ login: '', password: '', isPwd: true });
    const onSubmit = async () => {
      await fetch('http://localhost:3333/login', {
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
        .then((date) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (date.authenticated == true) {
            void router.push('/app');
          } else {
            $q.notify({
              message: 'Credências erradas ou inexistente',
              type: 'warning',
              position: 'top',
            });
            setTimeout(() => {
              $q.notify({
                message:
                  'Certifique-se de suas crendências ou se ainda não tiver, cria uma conta',
                type: 'info',
                position: 'top',
              });
            }, 3000);
          }
        });
    };
    const handleClickAnonymous = () => {
      // await fetch('http://localhost:3333/anonymous', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     login: state.login,
      //     password: state.password,
      //   }),
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((date) => console.log(date));
      console.log('logado modo anonimo');
    };

    return {
      onSubmit,
      handleClickAnonymous,
      state,
    };
  },
});
</script>
