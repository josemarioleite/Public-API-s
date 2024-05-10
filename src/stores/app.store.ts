import { defineStore } from 'pinia'

export const useAppStore = defineStore('appstore', {
  state: () => ({
    titlePage: '',
  }),
  actions: {
    setPage (title: string) {
      this.titlePage = title
    }
  }
})
