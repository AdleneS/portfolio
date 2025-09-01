<template>
  <div
    :class="[
      'absolute bottom-[3rem] h-px w-[98%] left-[1%] gap-4 flex',
      'enterDownAnim',
      { 'enterAnim-active': show },
    ]"
    style="font-family: OfficeCode"
  >
    <span class="hidden sm:contents">
      <img
        src="@/assets/images/star.webp"
        class="h-8 w-8 -top-1.5 relative"
        alt=""
      />
      <div class="h-px bg-white my-3 mx-2 border-b-1 flex-auto"></div>
      <p>ASABA STUDIO</p>
      <div class="h-px bg-white my-3 mx-2 border-b-1 flex-auto"></div>
      <p>{{ props.pageTitle }}</p>
      <div class="h-px bg-white my-3 mx-2 border-b-1 flex-auto"></div>
      <p>{{ date }}</p>
      <div class="h-px bg-white my-3 mx-2 border-b-1 flex-auto"></div>
    </span>
    <ContactMeButtonComponent></ContactMeButtonComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  pageTitle: String,
})

const date = new Date().getFullYear()

const show = ref(false)
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 200)
})
</script>

<style scoped>
img {
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
