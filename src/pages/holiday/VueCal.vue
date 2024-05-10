<template>
<VueCal
  active-view="month"
  eventsCountOnYearView
  hideViewSelector
  class="vuecal"
  :events="events"
  :selected-date="currentDate"
  :locale="lang"
  :disable-views="['years', 'day', 'week']"
>
</VueCal>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useHolidayStore } from '../../stores/holiday.store'
import VueCal from 'vue-cal'

defineOptions({
  name: 'VueCal',
})

const holidayStore = useHolidayStore()
const currentDate = ref(new Date())
const lang = computed(() => {
  let lang = localStorage.getItem('local-language')
  if (lang === 'en-US') {
    return lang = 'en'
  }

  return lang?.toLocaleLowerCase()
})
const events = computed(() => holidayStore.holidays)

onMounted(async () => {
  await holidayStore.loadHolidays(currentDate.value.getFullYear())
})
</script>

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
  background: #2196f3;
  color: #fff;
}

.vuecal .vuecal__cell-date {
  font-family: "Ubuntu Sans Mono", monospace;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}

.vuecal .vuecal__cell-events-count {
  background: #000;
  font-size: .8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 25px;
}
</style>
