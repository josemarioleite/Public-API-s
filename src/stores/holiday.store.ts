import { defineStore } from 'pinia'
import { HolidayClient } from '../http/holiday.http'
import { Holiday } from '../pages/holiday/models.interface'

const holidayClient = new HolidayClient()

export const useHolidayStore = defineStore('holidaystore', {
  state: () => ({
    isLoading: false,
    holidays: []
  }),
  actions: {
    async loadHolidays (year: number) {
      this.changeLoading(true)

      const data = await holidayClient._get(year)
      this.holidays = data.map((h: Holiday) => {
        return {
          start: h.date,
          end: h.date,
          title: h.name,
          content: h.localName
        }
      })

      setTimeout(() => {
        this.changeLoading(false)
      }, 1000)
    },
    changeLoading (value: boolean) {
      this.isLoading = value
    }
  }
})
