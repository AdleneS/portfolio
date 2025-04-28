import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePageStore } from '@/stores/pages'

export function useScrollNavigation(isScrolling: Ref<boolean>) {
  const store = usePageStore()
  const router = useRouter()
  let touchScrollY = 0

  const handleScroll = (event: any) => {
    console.log(store.currentPage)
    if (isScrolling.value) return
    isScrolling.value = true
    event.deltaY > 0 ? store.increment() : store.decrement()

    pushRouteSwitch()
  }

  function handleTouchStart(event: any) {
    touchScrollY = event.touches[0].clientY
  }

  function handleTouchEnd(event: any) {
    const touchEndY = event.changedTouches[0].clientY
    touchEndY < touchScrollY ? store.increment() : store.decrement()
    touchScrollY = 0
    pushRouteSwitch()
  }

  function pushRouteSwitch() {
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
    }, 1500)
  }
  onMounted(() => {
    window.addEventListener('wheel', handleScroll)
    // document.body.addEventListener('touchmove', handleScroll)
    document.body.addEventListener('touchstart', handleTouchStart)
    document.body.addEventListener('touchend', handleTouchEnd)
    // window.addEventListener('touchmove', handleScroll) // for desktop
  })

  onUnmounted(() => {
    window.removeEventListener('wheel', handleScroll)
  })
}
