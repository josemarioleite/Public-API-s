<template>
<div id="q-app">
  <q-layout view="hHh lpR fFf">

    <q-header reveal bordered class="bg-dark text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> {{ $t('header.title') }} </q-toolbar-title>
        <Translate />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      class="drawer"
      :width="250"
    >
      <Main />
    </q-drawer>

    <q-page-container>
      <q-page>
        <div class="title-page">
          <span>{{ titlePage }}</span>
        </div>
        <router-view />
      </q-page>
    </q-page-container>

  </q-layout>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Main, Translate } from './components/index'
import { useAppStore } from './stores/app.store'

defineOptions({
  name: 'App',
  components: { Main, Translate }
})

const leftDrawerOpen = ref(false)
const titlePage = computed(() => {
  return useAppStore().titlePage
})

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss">
.drawer {
  background: #F8F8F8;
  border-right: 2px solid #BEBEBE;
  color: #000;
}

.title-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  font-size: 2.2rem;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #000;
  border-radius: 4px;
}

@media only screen and (min-width: 500px) {
  .title-page {
    padding-left: 20px;
  }
}

@media only screen and (max-width: 499px) {
  .title-page {
    font-size: 2rem;
    text-align: center;
  }
}
</style>
