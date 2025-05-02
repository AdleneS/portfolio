<template>
  <h2
    class="font-extrabold tracking-tight text-white absolute top-0 sm:right-0 sm:px-0 sm:py-6 p-6"
    style="font-size: clamp(1.5rem, 6vw, 4rem); writing-mode: sideways-lr"
  >
    {{ props.title }}
  </h2>
</template>

<script setup lang="ts">
const props = defineProps({ title: String })
</script>

<style scoped lang="scss">
@media screen and (max-width: 639px) {
  h2 {
    writing-mode: horizontal-tb !important;
  }
}
</style>
