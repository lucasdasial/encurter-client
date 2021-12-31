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
    <AddUrl/>
  </transition>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import AddUrl from 'src/components/Add_url/Anonymous/index.vue'

export default defineComponent({
  components:{
    AddUrl,
  }
})
</script>
