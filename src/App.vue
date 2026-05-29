<script setup lang="ts">
import { useHead } from '@vueuse/head'
import '@/styles/reset.css'
import '@/styles/global.css'

// const world = ref<Awaited<ReturnType<typeof main>> | null>(null)

// onMounted(async () => {
//   await nextTick()
//   console.log(document.querySelectorAll<HTMLElement>('[data-three-scene]'))
//   if (window.innerWidth > 639) {
//     console.log('onMounted')
//     main().then(resolvedWorld => {
//       world.value = resolvedWorld
//       document.getElementById('loader')?.classList.add('fade-out')
//     })
//   } else {
//     setTimeout(() => {
//       document.getElementById('loader')?.classList.add('fade-out')
//     }, 500)
//   }
// })

useHead({
  title: 'Adlène SABA',
  meta: [{ name: 'description' }],
})
</script>

<template>
  <router-view />
</template>
