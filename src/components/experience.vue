<template>
  <section
    id="experience-section"
    class="relative flex h-screen w-screen flex-col justify-center overflow-hidden bg-black"
  >
    <!-- <PageTitle title=" MY EXPERIENCE" /> -->
    <HeaderComponent></HeaderComponent>
    <div class="square" :class="classObject"></div>
    <div class="flex h-full flex-col items-start justify-center p-6">
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
    <Footer />
  </section>
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
  cdlp: hover.value?.title === 'COMPTOIR DE LA PRESSE',
  effy: hover.value?.title === 'EFFY',
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
  },
  {
    title: 'ESENS',
    details: [
      'Full-stack consultant',
      'Showcasing business applications',
      'Stack: Vue, Svelte, Node.js',
    ],
  },
  {
    title: 'INPI',
    details: [
      'Full-stack consultant',
      'Process automation',
      'Stack: React, PHP, Cypress',
    ],
  },
  {
    title: 'COMPTOIR DE LA PRESSE',
    details: [
      'Full-stack developer',
      'Designed and developed end-to-end',
      'Stack: Vue, Nuxt, Supabase',
    ],
  },
  {
    title: 'EFFY',
    details: [
      'AI consultant',
      'Designed and developed a ChatGPT APP',
      'Stack: React, MCP, Javascript',
    ],
  },
]
</script>

<style>
.square {
  height: 0rem;
  width: 0rem;
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: 0;
  transition: all 0.5s ease;
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
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

.cdlp {
  background-image: url('@/assets/images/logo-cdlp1.svg');
  background-color: #fcd125;
}

.effy {
  background-image: url('@/assets/images/logo-effy.svg');
  background-color: #161637;
}
</style>
