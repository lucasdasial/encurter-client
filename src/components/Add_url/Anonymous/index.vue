<template>
  <main class="column items-center">
    <div class="box__img bg-orange-3 q-pa-md">
      <img src="~/assets/share_link.svg" />
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
        class="bg-grey-3 q-pa-md q-ma-md link__item row no-wrap justify-between"
        v-for="(link, key) in history"
        :key="key"
      >
        <a :href="'https://' + link" target="_blank">{{ link }}</a>
        <q-btn @click="onCopy" icon="content_copy" flat color="teal" />
      </div>
    </section>
  </main>
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
    const q = useQuasar();
    const state = reactive<State>({
      shortUrl: '',
      url: '',
    });
    const history = ref<string[]>([]);

    const toShort = async () => {
      if (!state.url) {
        q.notify({
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
      const linkRequest = {
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
          console.log(data);
          state.shortUrl = data.shortUrl;
          history.value.push(state.shortUrl);
        });
    };

    const onCopy = () => {
      const urlSelect = state.shortUrl;
      void navigator.clipboard.writeText(urlSelect);

      setTimeout(() => {
        q.notify({
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
      onCopy,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
