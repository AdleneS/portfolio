<template>
  <h2
    class="font-extrabold tracking-tight text-white absolute top-0 right-0 py-6"
    style="font-size: clamp(2.5rem, 8vw, 4rem); writing-mode: sideways-lr"
  >
    {{ props.title }}
  </h2>
</template>

<script setup lang="ts">
const props = defineProps({ title: String })
</script>
