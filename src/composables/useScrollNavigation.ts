import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePageStore } from '@/stores/pages'

export function useScrollNavigation(isScrolling: Ref<boolean>) {
  const store = usePageStore()
  const router = useRouter()

  const handleScroll = (event: any) => {
    if (!isScrolling.value) {
      isScrolling.value = true
      event.deltaY > 0 ? store.increment() : store.decrement()

      setTimeout(() => {
        isScrolling.value = false
        switch (store.currentPage) {
          case 0:
            router.push('/')
            break
          case 1:
            router.push('/about')
            break
          case 2:
            router.push('/experiences')
            break
          case 3:
            router.push('/contact')
            break
          default:
            router.push('/')
            break
        }
      }, 1500) // Attendre 1.5s avant de pouvoir re-scroll
    }
  }

  onMounted(() => {
    window.addEventListener('wheel', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('wheel', handleScroll)
  })
}
