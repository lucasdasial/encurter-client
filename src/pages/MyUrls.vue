<template>
  <q-page class="q-pa-lg">
    <h1 class="text-h2">Minhas Urls</h1>
    <main class="row col-12">
      <section
        class="col-12 col-sm-6 col-md-4 q-pa-md"
        v-for="(url, index) in state.myUrlsList"
        :key="index"
      >
        <div class="card bg-grey-3 q-pa-md">
          <h5 class="text-right text-grey">{{ index + 1 }}</h5>
          <div>
            <p class="text-h6">Original:</p>
            <a :href="'https://' + url.url_complete" target="_blank">{{
              url.url_complete
            }}</a>
          </div>

          <div>
            <p class="text-h6">Encurtada:</p>
            <a :href="'https://' + url.url_short" target="_blank">{{
              url.url_short
            }}</a>
            <q-btn
              @click="onCopy(url.url_short)"
              icon="content_copy"
              flat
              color="teal"
            />
          </div>
        </div>
      </section>
    </main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import useUserStore from 'src/store/users';
import { useQuasar } from 'quasar';
export default defineComponent({
  setup() {
    const useStore = useUserStore();
    const currentUserId = useStore.userId;
    const q = useQuasar();

    type Url = {
      url_complete: string;
      url_short: string;
    };

    interface State {
      myUrlsList: Url[];
    }

    const state = reactive<State>({
      myUrlsList: [],
    });

    void fetch('http://localhost:3333/url/get', {
      method: 'POST',
      body: JSON.stringify({
        userId: currentUserId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        state.myUrlsList.push(...data);
      });

    const onCopy = (link: string) => {
      const urlSelect = link;
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
      useStore,
      state,
      onCopy,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  transition: 400ms;
  &:hover {
    transform: scale(1.05);
  }
  a {
    color: grey;
    text-decoration: none;
    &:hover {
      color: orange;
    }
  }
}
</style>
