<template>
  <q-page class="">
    <!-- <transition appear enter-active-class="animated bounceIn slower delay-1s"> -->
    <AddUrl />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AddUrl from 'src/components/Add_url/Logado/logado.vue';

export default defineComponent({
  components: {
    AddUrl,
  },
});
</script>

<style lang="scss" scoped>
.input__url {
  width: 100%;
  max-width: 800px;
}
</style>
