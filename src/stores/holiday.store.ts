import { defineStore } from 'pinia'
import { HolidayClient } from '../http/holiday.http'
import { Holiday } from '../pages/holiday/models.interface'

const holidayClient = new HolidayClient()
const currentYear = new Date().getFullYear()

export const useHolidayStore = defineStore('holidaystore', {
  state: () => ({
    isLoading: true,
    year: currentYear,
    holidays: []
  }),
  actions: {
    async loadHolidays () {
      this.changeLoading(true)

      const data = await holidayClient._get(this.year)
      this.holidays = data.map((h: Holiday) => {
        return {
          start: h.date,
          end: h.date,
          title: h.name,
          content: h.localName,
          global: h.global
        }
      })

      this.changeLoading(false)
    },
    async setYear (value: number) {
      this.year = value

      await this.loadHolidays()
    },
    changeLoading (value: boolean) {
      this.isLoading = value
    }
  }
})
