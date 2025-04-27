<template>
  <a
    :href="props.link"
    target="_blank"
    class="font-bold text-white tracking-tight hover:underline hover:decoration-1 hover:decoration-white hover:decoration-2"
    style="font-size: clamp(2.5rem, 8vw, 6rem)"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  link: String,
})
</script>
