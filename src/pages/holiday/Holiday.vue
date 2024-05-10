<template>
<div class="holiday">
  <VueCal />
</div>
</template>

<script lang="ts" setup>
import VueCal from './VueCal.vue'
import { useAppStore } from '../../stores/app.store'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const $t = useI18n().t
const appStore = useAppStore()

defineOptions({
  name: 'Holiday',
  components: {VueCal}
})

onMounted(() => {
  const titlePage = $t('pages.title.holiday')
  appStore.setPage(titlePage)
})
</script>
