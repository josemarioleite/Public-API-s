<template>
<div class="home">
  <span> Teste </span>
</div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../../stores/app.store'

const $t = useI18n().t
const appStore = useAppStore()
const titlePage = computed(() => $t('pages.title.home'))

onMounted(() => {
  appStore.setPage(titlePage.value)
})
</script>
