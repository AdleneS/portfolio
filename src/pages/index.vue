<template>
  <section
    id="home-section"
    class="h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden"
  >
    <div class="absolute inset-0 z-0 h-full w-full" data-three-scene="0"></div>
    <div
      class="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black to-transparent"
    />

    <div
      style="font-family: Dirty"
      class="sm:hidden relative z-10 flex flex-nowrap flex-col items-center text-white"
    >
      <div style="font-size: clamp(3rem, 10vw, 10rem)">hI, i'm AdlÈnE</div>
      <div style="font-size: clamp(1.6rem, 5vw, 10rem)">
        fUll-StaCk deVelOpER
      </div>
    </div>
    <!-- <div class="scroll top-[8rem] relative z-10"></div> -->
  </section>
  <AboutPage />
  <ExperiencePage />
</template>
<script setup lang="ts">
import AboutPage from '../components/about.vue'
import ExperiencePage from '../components/experience.vue'

import main from '@/utils/three/main'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const world = ref<Awaited<ReturnType<typeof main>> | null>(null)
let isCreating = false

const handleResize = () => {
  if (window.innerWidth > 639 && !world.value && !isCreating) {
    isCreating = true
    main().then(resolvedWorld => {
      world.value = resolvedWorld
      isCreating = false
    })
  } else if (window.innerWidth <= 639 && world.value) {
    world.value.forEach(item => item.dispose())
    world.value = null
  }
}

onMounted(async () => {
  if (window.innerWidth > 639) {
    main().then(resolvedWorld => {
      world.value = resolvedWorld
      document.getElementById('loader')?.classList.add('fade-out')
    })
  } else {
    setTimeout(() => {
      document.getElementById('loader')?.classList.add('fade-out')
    }, 500)
  }
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  world.value?.forEach(item => item.dispose())
})
</script>

<style>
.separator {
  position: absolute;
  top: -80px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.separator svg {
  position: relative;
  display: block;
  width: calc(102% + 1.3px);
  height: 80px;
}

.separator .shape-fill {
  fill: rgb(255, 246, 214);
}
.maskAnimation {
  padding: 10px; /* control the thickness of the gradient "border" */
  border: 10px solid white;
  mask:
    linear-gradient(#000000 0 0),
    radial-gradient(#000 70%, #0000 71%) content-box 50% / var(--_s, 0% 0%)
      no-repeat;
  mask-composite: exclude;
  transition: 0.5s;
  cursor: pointer;
  filter: none();
}
.maskAnimation:hover {
  filter: invert();
  /* --_s: 150% 150%; */
}

.scroll {
  width: 30px;
  height: 30px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  position: relative;
  animation: down 1.5s infinite;
  -webkit-animation: down 1.5s infinite;
  &::before {
    content: '';
    position: absolute;
    top: 7px;
    left: 9px;
    width: 9px;
    height: 9px;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: rotate(-45deg);
  }
}

@keyframes down {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translateY(15px);
  }
  40% {
    transform: translate(0);
  }
}

@-webkit-keyframes down {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translateY(15px);
  }
  40% {
    transform: translate(0);
  }
}
</style>
