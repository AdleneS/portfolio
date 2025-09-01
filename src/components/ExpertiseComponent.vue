<template>
  <div
    :class="[
      'flex flex-col group',
      'enterLeftAnim',
      { 'enterAnim-active': show },
    ]"
    style="font-family: Funny"
  >
    <h3
      class="mb-4 font-extrabold tracking-tight text-white list-title transition-transform duration-700 flex items-center gap-2"
      style="font-size: clamp(1rem, 4vw, 4rem)"
    >
      {{ props.expertise.title }}
    </h3>
    <ul
      class="list-none text-white list-init transition-all duration-700"
      style="font-size: clamp(0.7rem, 1vw, 1.5rem)"
    >
      <li
        v-for="(description, i) in expertise.description"
        :key="i"
        class="description-item mb-0 sm:mb-5 flex items-center w-full"
      >
        <img
          src="@/assets/images/star.webp"
          class="h-4 w-4 mr-4 relative"
          alt=""
        />
        <div class="sm:block hidden">
          <span
            v-for="(letter, j) in splitToLetters(description)"
            :key="j"
            class="fade-in-letter"
            :style="{ transitionDelay: j * 0.01 + 's' }"
          >
            {{ letter }}
          </span>
        </div>
        <div class="sm:hidden block">
          {{ description }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import '@/styles/animations.css'
const props = defineProps(['expertise'])

function splitToLetters(text) {
  return text.split('')
}

const show = ref(false)
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 200)
})
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
  /* Sur mobile, la liste est toujours visible */
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
  max-height: 500px; /* Ajuste selon la taille de ta liste */
  overflow: visible;
}
.description-item {
  /* Pour éviter le flash de texte brut */
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
