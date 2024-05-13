<template>
<template v-if="isLoading">
  <q-skeleton
    class="skeleton"
    animation="wave"
  >
    <q-inner-loading
      :showing="isLoading"
      :label="$t('pages.holiday.loading')"
      label-class="text-blue"
      label-style="font-size: 1.5rem"
    />
  </q-skeleton>
</template>
<template v-else>
  <VueCal
    eventsCountOnYearView
    hideViewSelector
    class="vuecal"
    cell-contextmenu
    clickToNavigate
    :active-view="activeView"
    :dblclick-to-navigate="false"
    :events="events"
    :selected-date="currentDate"
    :locale="lang"
    :disable-views="['years', 'day', 'week', 'year']"
    :time="false"
    @view-change="eventChange"
  >
    <template #events-count="{ events }">
      <span style="cursor: pointer;">
        {{ String(events.map(v => v.content)).replace('[\[\."\]]', '') }}
      </span>
    </template>
  </VueCal>
</template>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useHolidayStore } from '../../stores/holiday.store'
import VueCal from 'vue-cal'

defineOptions({
  name: 'VueCal',
})

const currentDate = computed(() => {
  const yearStore = computed(() => holidayStore.year)
  const date = new Date().getMonth()

  return new Date(yearStore.value, date)
})

const activeView = ref<string>('month')
const holidayStore = useHolidayStore()
const lang = computed(() => {
  let lang = localStorage.getItem('local-language') || 'pt-br'
  if (lang === 'en-US') {
    return lang = 'en'
  }

  return lang?.toLocaleLowerCase()
})
const events = computed(() => holidayStore.holidays)
const isLoading = computed(() => holidayStore.isLoading)

const loadHolidaysWithYear = async () => {
  await holidayStore.loadHolidays()
}

const eventChange = async (value: any) => {
  const dateParam = new Date(value.endDate)

  if (currentDate.value.getFullYear() !== dateParam.getFullYear()) {
    currentDate.value = dateParam
    holidayStore.setYear(dateParam.getFullYear())

    return await loadHolidaysWithYear()
  }

  return currentDate.value = dateParam
}
</script>

<style lang="scss">
.skeleton {
  height: 75vh;
}
</style>

<style>
.vuecal {
  height: 75vh;
}

.vuecal .vuecal__title-bar {
  display: flex;
  flex-direction: row;
  background: #2196f3;
}

.vuecal .vuecal__title-bar span {
  color: #fff;
}

.vuecal .vuecal__title-bar button {
  color: #fff;
}

.vuecal .vuecal__cell-content {
  border: 1px solid #B7DFFF;
}

.vuecal .vuecal__cell-content:hover {
  background: #F1F2F3;
  cursor: default;
}

.vuecal .vuecal__cell-date {
  font-family: "Ubuntu Sans Mono", monospace;
  font-size: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 125px;
}

.vuecal .vuecal__cell-events-count {
  background: #000;
  font-size: .7rem;
  padding: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  border-radius: 5px;
}
</style>
