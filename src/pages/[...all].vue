<template>
  <div
    class="h-screen w-screen flex flex-col items-center justify-center text-white-800 text-7xl absolute top-0 left-0 bg-black"
  >
    <h1>Error 404</h1>
    <button class="btn bg-white text-black m-4" @click="goHome">
      Return to Home
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
