<template>
  <div class="row items-center justify-evenly">
    <main class="q-pa-md" style="max-width: 400px">
      <p class="text-h5 text-orange q-mb-lg">Criar uma conta</p>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          name="login"
          v-model="state.login"
          label="Usuário "
          color="orange"
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
        <q-input
          v-model="state.password2"
          filled
          name="password"
          label="Repita a senha"
          color="orange"
          :type="state.isPwd2 ? 'password' : 'text'"
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        >
          <template v-slot:prepend>
            <q-icon name="key" color="orange" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="state.isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="state.isPwd2 = !state.isPwd2"
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
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'FormRegister',

  setup() {
    const $q = useQuasar();
    const state = reactive({
      login: '',
      password: '',
      password2: '',
      isPwd: true,
      isPwd2: true,
    });

    const toRegister = async () => {
      await fetch('http://localhost:3333/register', {
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
          if (date.existingAccount == true) {
            $q.notify({
              message: 'Conta já existe',
              type: 'warning',
              position: 'top',
            });
          } else {
            $q.notify({
              message: 'Conta criada',
              type: 'positive',
              position: 'top',
            });
            setTimeout(() => {
              $q.notify({
                message:
                  'Agora você pode entrar com sua conta, volte e faça o login',
                type: 'info',
                position: 'top',
              });
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          $q.notify({
            message: 'Houve um erro ao tentar criar a conta',
            type: 'negative',
            position: 'top',
          });
        });
    };

    const onSubmit = () => {
      if (state.password != state.password2) {
        $q.notify({
          message: 'Senhas diferentes',
          type: 'warning',
          position: 'top',
        });
      } else {
        void toRegister();
      }
    };
    const handleClickAnonymous = () => {
      console.log('oi');
    };

    return {
      onSubmit,
      handleClickAnonymous,
      state,
    };
  },
});
</script>
