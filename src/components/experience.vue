<template>
  <section
    id="experience-section"
    class="relative flex min-h-screen w-screen flex-col justify-center bg-black py-16"
  >
    <HeaderComponent></HeaderComponent>
    <div
      class="flex flex-1 flex-col items-center justify-center px-6 pt-20 pb-8"
    >
      <div
        class="grid w-full max-w-full grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      >
        <ExperiencesComponent
          v-for="(experience, i) in experiences"
          :exp="experience"
          :colorClass="experience.colorClass"
          :key="i"
        />
      </div>
    </div>
    <Footer />
  </section>
</template>

<script setup lang="ts">
import ExperiencesComponent from '@/components/ExperiencesComponent.vue'

const experiences = [
  {
    title: 'LOUIS VUITTON',
    job: 'Full-stack consultant',
    duration: '2 years',
    country: 'Paris',
    colorClass: 'louis-vuitton',
    details: [
      'Full-stack consultant',
      'UI/UX design and integration',
      'AI projects',
      'Stack: Vue, React, Node.js',
    ],
  },
  {
    title: 'ESENS',
    colorClass: 'esens',
    job: 'Full-stack consultant',
    duration: '3 years',
    country: 'Paris',
    details: [
      'Showcasing business applications',
      'Stack: Vue, Svelte, Node.js',
    ],
  },
  {
    title: 'INPI',
    job: 'Full-stack consultant',
    duration: '7 months',
    country: 'Paris',
    colorClass: 'inpi',
    details: ['Process automation', 'Stack: React, PHP, Cypress'],
  },
  {
    title: 'COMPTOIR DE LA PRESSE',
    job: 'Full-stack developer',
    duration: '6 months',
    country: 'Paris',
    colorClass: 'cdlp',
    details: [
      'Designed and developed end-to-end online store',
      'Stack: Vue, Nuxt, Supabase',
    ],
  },
  {
    title: 'EFFY',
    job: 'AI consultant',
    duration: '6 months',
    country: 'Paris',
    colorClass: 'effy',
    details: [
      'Designed and developed a ChatGPT APP',
      'Stack: React, MCP, Javascript',
    ],
  },
]
</script>
