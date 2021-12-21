<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Usuário *"
          color="orange"
          hint="preencha com seu usuário cadastrado"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Campo deve ser preenchido',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="person" color="orange" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          filled
          label="Senha"
          color="orange"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:prepend>
            <q-icon name="key" color="orange" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
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
          <q-btn
            label="entrar modo anônimo"
            color="grey"
            flat
            class="q-mt-sm full-width"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',

  setup() {
    return {
      password: ref(''),
      isPwd: ref(true),
    };
  },
});
</script>
