<template>
  <div class="loader" :class="{ 'loader--active': isAnimating }">
    <div class="loader__tiles">
      <div class="loader__tile"></div>
      <div class="loader__tile"></div>
      <div class="loader__tile"></div>
      <div class="loader__tile"></div>
      <div class="loader__tile"></div>
    </div>
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

.wrapper {
  height: 100vh;
  text-align: center;

  button {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}

.loader {
  $parent: &;

  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 0;
  height: 100vh;
  transition:
    width 0s 1.4s ease,
    background-color 0.7s ease;

  #{$parent}__tile {
    position: absolute;
    left: 0;
    width: 0;
    height: 20%;
    background-color: #ffffff;
    transition:
      width 0.7s ease,
      background-color 1s ease;

    @for $i from 0 through $tiles {
      &:nth-child(#{$i}) {
        top: calc(#{$i - 1} * 20%);
        transition-delay: #{($i - 1) * 0.2s};
      }
    }
  }

  &--active {
    width: 100%;
    background-color: black;
    transition-delay: 0s;

    #{$parent}__tile {
      width: 100%;
      background-color: black;

      @for $i from 0 through $tiles {
        &:nth-child(#{$i}) {
          transition-delay: #{($i - 1) * 0.2s};
        }
      }
    }
  }
}
</style>
