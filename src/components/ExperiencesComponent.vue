<template>
  <div class="flex flex-col group">
    <h3
      class="mb-4 font-extrabold tracking-tight text-white list-title transition-transform duration-700 underline"
      style="font-size: clamp(2.5rem, 8vw, 6rem)"
    >
      <slot></slot>
    </h3>
    <ul
      v-if="props.details && props.details.length"
      class="list-none text-white list-init transition-all duration-700"
      style="font-size: clamp(0.8rem, 1vw, 2rem)"
    >
      <li
        v-for="(description, i) in props.details"
        :key="i"
        class="before:content-['-'] before:mr-2 description-item"
      >
        <span
          v-for="(letter, j) in splitToLetters(description)"
          :key="j"
          class="fade-in-letter"
          :style="{ transitionDelay: j * 0.04 + 's' }"
        >
          {{ letter }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  details: {
    type: Array as () => string[],
    default: () => [],
  },
})
function splitToLetters(text: string) {
  return text.split('')
}
</script>

<style>
.list-title {
  transition: transform 0.7s ease;
}
.list-init {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition:
    opacity 0.7s,
    max-height 0.7s;
}
@media screen and (max-width: 639px) {
  .list-init {
    opacity: 1 !important;
    max-height: 500px !important;
    overflow: visible !important;
  }
  .fade-in-letter {
    opacity: 1 !important;
    transition-delay: 0s !important;
  }
}
.group:hover .list-init {
  opacity: 1;
  max-height: 500px;
  overflow: visible;
}
.description-item {
  white-space: pre-wrap;
}
.fade-in-letter {
  display: inline-block;
  opacity: 0;
  transition: opacity 0.3s;
}
.group:hover .fade-in-letter {
  opacity: 1;
}
</style>
