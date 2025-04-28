import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePageStore = defineStore('pages', {
  state: () => ({ page: 0 }),
  getters: {
    currentPage(state) {
      return state.page
    },
  },
  actions: {
    increment() {
      this.page < 2 ? this.page++ : (this.page = 0)
    },
    decrement() {
      this.page > 0 ? this.page-- : (this.page = 2)
    },
    setPage(newPage: number) {
      if (this.page !== newPage) this.page = newPage
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
