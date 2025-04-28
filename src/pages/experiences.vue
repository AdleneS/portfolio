<template>
  <PageTitle title=" MY EXPERIENCES" />
  <div class="square" :class="classObject"></div>
  <div class="flex flex-col justify-center h-full p-6">
    <ExperiencesComponent
      v-for="(experience, i) in experiences"
      :link="experience.link"
      @mouseover="hover = experience"
      @mouseleave="hover = false"
      :key="i"
      >{{ experience.title }}</ExperiencesComponent
    >
  </div>
  <Footer pageTitle="Experiences"></Footer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const hover = ref()

const classObject = computed(() => ({
  active: hover.value,
  inpi: hover.value?.title === 'INPI',
  'louis-vuitton': hover.value?.title === 'LOUIS VUITTON',
  esens: hover.value?.title === 'ESENS',
}))

const experiences = [
  {
    title: 'LOUIS VUITTON',
    link: 'https://www.louisvuitton.com',
  },
  {
    title: 'ESENS',
    link: 'https://esensconsulting.com/',
  },
  {
    title: 'INPI',
    link: 'https://www.inpi.fr',
  },
]
</script>

<style>
.square {
  height: 0%;
  width: 0%;
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 0;
  transition: all 0.5s ease;
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
}

.active {
  height: 75%;
  width: 50%;
}

.inpi {
  background-image: url('@/assets/images/logo-inpi.png');
  background-color: rgb(43, 93, 150);
}

.louis-vuitton {
  background-image: url('@/assets/images/logo-louis_vuitton.svg');
  background-color: rgb(49, 23, 9);
}

.esens {
  background-image: url('@/assets/images/logo-esens.png');
  background-color: #f28f5d;
}
</style>
