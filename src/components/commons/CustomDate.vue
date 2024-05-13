<template>
<div class="date">
  <q-icon @click="subtractYear" name="arrow_back_ios" class="date__icon" />
  <span>{{ yearStore }}</span>
  <q-icon @click="addYear" name="arrow_forward_ios" class="date__icon" />
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { useHolidayStore } from '../../stores/holiday.store'

const holidayStore = useHolidayStore()

export default defineComponent({
  name: 'Custom-Date',
  computed: {
    yearStore () {
      return holidayStore.year
    }
  },
  methods: {
    addYear () {
      return holidayStore.setYear(this.yearStore + 1)
    },
    subtractYear () {
      return holidayStore.setYear(this.yearStore - 1)
    }
  }
})
</script>

<style lang="scss" scoped>
.date {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 300px;

  span {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1.5rem;
    padding: 0 50px 0 50px;
  }

  &__icon {
    font-size: 20px;
  }

  &__icon:hover, span:hover {
    cursor: pointer;
    color: #2196f3;
  }
}
</style>
