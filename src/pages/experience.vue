<template>
  <PageTitle title=" MY EXPERIENCE" />
  <HeaderComponent></HeaderComponent>
  <div class="square" :class="classObject"></div>
  <div class="flex flex-col justify-center h-full p-6 items-start">
    <ExperiencesComponent
      v-for="(experience, i) in experiences"
      @mouseover="hover = experience"
      @mouseleave="hover = false"
      :details="experience.details"
      :key="i"
    >
      {{ experience.title }}
    </ExperiencesComponent>
  </div>
  <Footer pageTitle="EXPERIENCE"></Footer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ExperiencesComponent from '@/components/ExperiencesComponent.vue'

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
    details: [
      'Full-stack consultant',
      'UI/UX design and integration',
      'AI projects',
      'Stack: Vue, React, Node.js',
    ],
    link: 'https://www.louisvuitton.com',
  },
  {
    title: 'ESENS',
    details: [
      'Full-stack consultant',
      'Showcasing business applications',
      'Stack: Vue, Svelte, Node.js',
    ],
    link: 'https://esensconsulting.com/',
  },
  {
    title: 'INPI',
    details: [
      'Full-stack consultant',
      'Process automation',
      'Stack: React, PHP, Cypress',
    ],
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
