<template>
<q-scroll-area class="fit">
  <q-list padding class="menu-list">

    <template v-for="(item, index) in mains" :key="index">
      <q-item clickable v-ripple @click="goToPage(item)">
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>

        <q-item-section>
          <span> {{ item.title }} </span>
        </q-item-section>
      </q-item>
    </template>

  </q-list>
</q-scroll-area>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const $router = useRouter()
const $t = useI18n().t

defineOptions({
  name: 'Main'
})

interface Main {
  icon: string
  title: string
  page: string
}

const titleMain = computed(() => $t('header.main.title').split('_').map(str => str.replace(/-/g, ' ')))
const mains = computed(() => {
  const main: Array<Main> = [
    // { icon: 'home', title: titleMain.value[0], page: 'home' },
    { icon: 'auto_stories', title: titleMain.value[1], page: 'holy-bible' },
    { icon: 'calendar_month', title: titleMain.value[2], page: 'holiday' },
    { icon: 'colorize', title: titleMain.value[3], page: 'colors' }
  ]

  return main
})

const goToPage = (main: Main) => {
  $router.push({ name: main.page })
}
</script>

<style lang="scss" scoped>

</style>
