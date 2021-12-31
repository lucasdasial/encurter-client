<template>
    <main class="column items-center">

      <div class="box__img bg-orange-3 q-pa-md">
        <img src="~/assets/link_shortener.svg" />
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
          name="url"
          label="Urls validas apenas com (https://...)"
        >
          <template v-slot:prepend>
            <q-icon size="40px" name="link" color="orange" />
          </template>
        </q-input>

        <div>
          <q-btn
            @click="handleClick"
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

    const handleClick = () => {
      if (!state.url) {
        $q.notify({
          message: 'Porfavor insira alguma url para poder encurtar',
          type: 'warning',
          position: 'top',
        });
        return;
      }
      void fetchShorter()
    };

    async function fetchShorter(): Promise<void> {
      const requestHeaders={
        'content-Type': 'application/json',
        apiKey: 'aa16d5d562c443be8b7e076b6a7be082',
      };
      let linkRequest={
        destination: state.url,
        domain: { fullName: 'rebrand.ly' },
      };
      await fetch('https://api.rebrandly.com/v1/links', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(linkRequest),
      })
        .then((res) => res.json())
        .then((data: { shortUrl: string; }) => {
          state.shortUrl=data.shortUrl;
          history.value.push(state.shortUrl);
          saveOnDatabase()
        });
    }
    const saveOnDatabase = () =>{
      void fetch('http://localhost:3333/save-url',{
        method: 'POST',
        body: JSON.stringify({
          url: state.url,
          shortUrl : state.shortUrl
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(res => res.json()).then(data => console.log(data))
      // console.log(state.url)
      // console.log(state.shortUrl)
    }

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
      handleClick,
      state,
      history,
      toCopy,
    };
  },
});
</script>

<style lang="scss" scoped>
 @import "./styles.scss";
</style>
