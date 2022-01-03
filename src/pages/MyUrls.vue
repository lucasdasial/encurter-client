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
            <section class="row justify-between">
              <a :href="'https://' + url.url_short" target="_blank">{{
                url.url_short
              }}</a>
              <span>
                <q-btn
                  @click="onCopy(url.url_short)"
                  icon="content_copy"
                  flat
                  color="teal"
                />
                <q-btn
                  @click="onDelete(url.id_url)"
                  icon="delete"
                  flat
                  color="red"
                />
              </span>
            </section>
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
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const useStore = useUserStore();
    const currentUserId = useStore.userId;
    const q = useQuasar();

    type Url = {
      id_url: number;
      url_complete: string;
      url_short: string;
    };

    interface State {
      myUrlsList: Url[];
    }

    const state = reactive<State>({
      myUrlsList: [],
    });

    const getCurrentUrl = () => {
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
    };
    getCurrentUrl();

    const onCopy = (link: string) => {
      void navigator.clipboard.writeText(link);
      setTimeout(() => {
        q.notify({
          message: 'Copiado',
          type: 'positive',
          position: 'top',
        });
      }, 1000);
    };
    const onDelete = async (idUrl: number) => {
      await fetch('http://localhost:3333/url/delete', {
        method: 'POST',
        body: JSON.stringify({
          idUrl: idUrl,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((result) => {
        if (result.status == 200) {
          q.notify({
            message: 'Url deletada',
            position: 'top',
            type: 'info',
          });
          setTimeout(() => {
            void router.push('/app');
          }, 2000);
        }
      });
    };

    return {
      useStore,
      state,
      onCopy,
      onDelete,
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
