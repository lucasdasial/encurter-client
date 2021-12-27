<template>
  <q-page class="row items-center justify-evenly">
    <main class="q-pa-md" style="width: 100%; max-width: 800px">
      <q-form class="q-gutter-md row no-wrap">
        <q-input
          class="input__url"
          filled
          v-model="url"
          name="login"
          label="Insira a url que irá encurtar"
          color="orange"
        >
          <template v-slot:prepend>
            <q-icon size="40px" name="link" color="orange" />
          </template>
        </q-input>
      </q-form>
      <q-btn
        @click="toShort"
        icon="add_link"
        label="encurtar"
        class="bg-orange text-white q-my-md"
        style="width: 50%; float: center"
      />
      <!-- <p>{{ state.shortUrl }}</p> -->
    </main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useQuasar } from 'quasar';

type State = {
  shortUrl: string;
};

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const url = ref(null);
    const state = reactive<State>({
      shortUrl: '',
    });
    const toShort = async () => {
      if (!url.value) {
        $q.notify({
          message: 'Porfavor insira alguma url para poder encurtar',
          type: 'warning',
          position: 'top',
        });
        return;
      }
      // const apiKey = 'aa16d5d562c443be8b7e076b6a7be082';

      const requestHeaders = {
        'content-Type': 'application/json',
        apiKey: 'aa16d5d562c443be8b7e076b6a7be082',
      };
      let linkRequest = {
        destination: url.value,
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
          console.log(state.shortUrl);
        });
    };
    return {
      toShort,
      url,
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.input__url {
  width: 100%;
  max-width: 800px;
}
</style>
