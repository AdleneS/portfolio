<template>
  <div class="loader" :class="{ 'loader--active': isAnimating }">
    <div class="loader__tile"></div>
    <div class="loader__tile"></div>
    <div class="loader__tile"></div>
    <div class="loader__tile"></div>
    <div class="loader__tile"></div>
  </div>
</template>

<script setup>
import { usePageStore } from '@/stores/pages'
import { ref, watch } from 'vue'

const isAnimating = ref(false)

const store = usePageStore()

watch(
  () => store.currentPage,
  () => {
    isAnimating.value = true
    setTimeout(() => {
      isAnimating.value = false
    }, 1500)
  },
)
</script>
<style lang="scss">
$tiles: 5;

body {
  background-color: transparent;
}

.loader {
  $parent: &;

  pointer-events: none;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  background-color: black;
  transition: opacity 0.7s ease;
  // #{$parent}__tile {
  //   position: absolute;
  //   left: 0;
  //   width: 0;
  //   height: 20%;
  //   background-color: #ffffff;
  //   transition:
  //     width 0.7s ease,
  //     background-color 1s ease;
  //   @for $i from 0 through $tiles {
  //     &:nth-child(#{$i}) {
  //       top: calc(#{$i - 1} * 20%);
  //       transition-delay: #{($i - 1) * 0.2s};
  //     }
  //   }
  // }
  &--active {
    width: 100%;
    background-color: black;
    opacity: 1;
    // animation: fadeIn 0.75s ease-in-out 2 alternate;

    #{$parent}__tile {
      height: 20%;
      width: 0;
      animation-name: scaleIn, changeColor;
      animation-duration: 0.5s, 1s;
      animation-timing-function: ease, none;
      animation-iteration-count: 1, 1;
      animation-fill-mode: forwards, forwards;
      animation-delay: 0, 0s;

      @for $i from 0 through $tiles {
        &:nth-child(#{$i}) {
          // top: calc(#{$i - 1} * 20%);
          animation-delay: #{($i - 1) * 0.2s};
        }
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  @keyframes changeColor {
    0% {
      background-color: white;
    }
    100% {
      background-color: black;
    }
  }
}
</style>
