<template>
<div class="holiday">
  <c-date class="holiday__date" />
  <TableHoliday />
  <VueCal v-if="!isMobile" />
</div>
</template>

<script lang="ts" setup>
import VueCal from './VueCal.vue'
import TableHoliday from './TableHoliday.vue'
import { useAppStore } from '../../stores/app.store'
import { useHolidayStore } from '../../stores/holiday.store'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const $t = useI18n().t
const appStore = useAppStore()
const holidayStore = useHolidayStore()

defineOptions({
  name: 'Holiday',
  components: {VueCal, TableHoliday}
})

const isMobile = computed(() => {
  return $q.platform.is.mobile
})

onMounted(async () => {
  const titlePage = $t('pages.title.holiday')
  appStore.setPage(titlePage)

  await holidayStore.loadHolidays()
})
</script>

<style lang="scss" scoped>
.holiday {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__date {
    display: flex;
    align-self: center;
  }
}
</style>
