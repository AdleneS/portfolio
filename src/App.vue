<script setup lang="ts">
import { useHead } from '@vueuse/head'
import '@/styles/reset.css'
import '@/styles/global.css'
import main from '@/utils/three/main'
import { usePageStore } from '@/stores/pages'
import { useScrollNavigation } from './composables/useScrollNavigation'
import { onMounted, ref } from 'vue'
import { syncStoreWithRoute } from './composables/syncStoreWithRoute'
import type { Scene } from 'three'
import { useRoute, useRouter } from 'vue-router'

const isScrolling = ref(false)
const scene = ref<Scene | null>(null)
const store = usePageStore()
const route = useRoute()
const router = useRouter()
useScrollNavigation(isScrolling)

onMounted(() => {
  if (window.innerWidth > 1024) {
    main(store).then(resolvedScene => {
      scene.value = resolvedScene
      // syncStoreWithRoute(store, route)
      document.getElementById('loader')?.classList.add('fade-out')
    })
  } else {
    setTimeout(() => {
      document.getElementById('loader')?.classList.add('fade-out')
    }, 500)
  }
})

useHead({
  title: 'Adlène SABA',
  meta: [{ name: 'description' }],
})

router.afterEach(() => {
  setTimeout(() => {
    syncStoreWithRoute(store, route)
  }, 500)
})
</script>

<template>
  <router-view />
</template>
