<template>
  <div
    class="absolute bottom-[2rem] h-px w-[96%] left-[2%] gap-4 hidden sm:flex"
    style="font-family: OfficeCode"
  >
    <img
      src="@/assets/images/star.webp"
      class="h-8 w-8 -top-1.5 relative"
      alt=""
    />
    <div class="h-px bg-white my-[0.6rem] border-b-1 flex-auto"></div>
    <p>ASABA STUDIO</p>
    <div class="h-px bg-white my-[0.6rem] border-b-1 flex-auto"></div>
    <p>{{ props.pageTitle }}</p>
    <div class="h-px bg-white my-[0.6rem] border-b-1 flex-auto"></div>
    <p>{{ date }}</p>
    <div class="h-px bg-white my-[0.6rem] border-b-1 flex-auto"></div>
    <img
      src="@/assets/images/star.webp"
      class="h-8 w-8 -top-1.5 relative"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  pageTitle: String,
})

const date = new Date().getFullYear()
</script>
