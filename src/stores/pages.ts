import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePageStore = defineStore('pages', {
  state: () => ({ page: 0, isLoading: true }),
  getters: {
    currentPage(state) {
      return state.page
    },
    isLoading(state) {
      return state.isLoading
    },
  },
  actions: {
    increment() {
      this.page < 2 ? this.page++ : (this.page = 0)
    },
    decrement() {
      if (this.page > 0) this.page--
    },
    setPage(newPage: number) {
      if (this.page !== newPage) this.page = newPage
    },
    setIsLoading(newState: boolean) {
      // this.isLoading = newState
      console.log('isLoading', newState)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
