<template>
<div class="table-holiday">
  <q-table
    dense
    :rows-per-page-options="[50]"
    :rows="holidays"
    :columns="columns"
    :loading="isLoading"
    row-key="name"
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useHolidayStore } from '../../stores/holiday.store'
import { QTableColumn } from 'quasar'
import { useI18n } from 'vue-i18n'

const $t = useI18n().t
const holidayStore = useHolidayStore()

defineOptions({
  name: 'Table-Holiday'
})

const holidays = computed(() => holidayStore.holidays)
const isLoading = computed(() => holidayStore.isLoading)
const columns = computed(() => {
  const columns: QTableColumn[] = [
    { name: 'date', align: 'center', field: 'end', label: $t('pages.holiday.table.date'), format: v => formatDate(v) },
    { name: 'name', align: 'left', field: 'content', label: $t('pages.holiday.table.name') },
    { name: 'nameInternacional', align: 'left', field: 'title', label: $t('pages.holiday.table.nameInternational') }
  ]

  return columns
})

const formatDate = (date: string): string => {
  const nameStore = 'local-language'
  const valueStore = localStorage.getItem(nameStore) || null
  const partesData = date.split('-')
  const [year, month, day] = partesData

  if (valueStore && valueStore === 'pt-BR') {
    return `${day}/${month}/${year}`
  } else {
    return `${year}/${month}/${day}`
  }
}
</script>

<style lang="scss" scoped>
</style>
