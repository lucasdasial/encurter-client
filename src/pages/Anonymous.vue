<template>
  <header class="row justify-between q-pa-sm">
    <p class="text-h4 text-grey-9">Encurter</p>
    <section class="row q-gutter-lg">
      <router-link to="/login">
        <q-btn label="Entrar" rounded flat color="grey-8" />
      </router-link>

      <router-link to="/register">
        <q-btn label="Criar conta" rounded outline color="orange" />
      </router-link>
    </section>
  </header>

  <transition appear enter-active-class="animated bounceIn slower delay-1s">
    <main class="column items-center">
      <div class="box__img bg-teal q-pa-md">
        <img src="~/assets/connection.svg" />
      </div>
      <section
        class="q-pa-md row no-wrap col-12"
        style="width: 100%; max-width: 1024px"
      >
        <q-input
          class="input__url q-mr-sm"
          outlined
          color="orange"
          v-model="state.url"
          name="login"
          label="Urls validas apenas com (https://www...)"
        >
          <template v-slot:prepend>
            <q-icon size="40px" name="link" color="orange" />
          </template>
        </q-input>

        <div>
          <q-btn
            @click="toShort"
            icon="add_link"
            class="col-2 bg-orange text-white full-height"
          />
        </div>
      </section>

      <section class="link">
        <div
          class="
            bg-grey-3
            q-pa-md q-ma-md
            link__item
            row
            no-wrap
            justify-between
          "
          v-for="(link, key) in history"
          :key="key"
        >
          <a :href="'https://' + link" target="_blank">{{ link }}</a>
          <q-btn @click="toCopy" icon="content_copy" flat color="teal" />
        </div>
      </section>
    </main>
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useQuasar } from 'quasar';

type State = {
  shortUrl: string;
  url: string | null;
};

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const state = reactive<State>({
      shortUrl: '',
      url: '',
    });
    const history = ref<string[]>([]);

    const toShort = async () => {
      if (!state.url) {
        $q.notify({
          message: 'Porfavor insira alguma url para poder encurtar',
          type: 'warning',
          position: 'top',
        });
        return;
      }

      const requestHeaders = {
        'content-Type': 'application/json',
        apiKey: 'aa16d5d562c443be8b7e076b6a7be082',
      };
      let linkRequest = {
        destination: state.url,
        domain: { fullName: 'rebrand.ly' },
      };
      await fetch('https://api.rebrandly.com/v1/links', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(linkRequest),
      })
        .then((res) => res.json())
        .then((data: { shortUrl: string }) => {
          state.shortUrl = data.shortUrl;
          history.value.push(state.shortUrl);
        });
    };

    const toCopy = () => {
      const urlSelect = state.shortUrl;
      void navigator.clipboard.writeText(urlSelect);

      setTimeout(() => {
        $q.notify({
          message: 'Copiado',
          type: 'positive',
          position: 'top',
        });
      }, 1000);
    };
    return {
      toShort,
      state,
      history,
      toCopy,
    };
  },
});
</script>

<style lang="scss" scoped>
.box__img {
  margin: auto;
  width: 100%;

  display: flex;
  justify-content: center;
  img {
    width: 400px;
  }
}
.input__url {
  width: 100%;
  max-width: 1024px;
}
.link {
  width: 100%;
  max-width: 1024px;
  .link__item {
    a {
      color: #009688;
      &:hover {
        color: orange;
      }
    }
  }
}
</style>
