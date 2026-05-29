<template>
  <section
    id="expertise-section"
    class="relative flex h-screen w-screen flex-col justify-center overflow-hidden bg-transparent"
  >
    <div class="absolute inset-0 z-0 h-full w-full" data-three-scene="1"></div>
    <!-- <PageTitle title=" MY EXPERTISE" /> -->
    <div class="relative z-10 flex flex-col justify-center p-6">
      <div class="flex flex-col items-start justify-center gap-6">
        <ExpertiseComponent
          v-for="(expertise, i) in expertises"
          :expertise="expertise"
          :key="i"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const expertises = [
  {
    title: 'FULL-STACK DEV - REACT/VUE',
    description: [
      '4 years of full-stack development experience.',
      'Skilled in React and Vue for dynamic UIs.',
      'Focused on seamless user experiences and clean code.',
      'Up-to-date with modern web development trends.',
    ],
  },
  {
    title: 'UI/UX DESIGN',
    description: [
      '2 years of UI/UX design experience at Louis Vuitton.',
      'Expertise in creating visually appealing and user-friendly designs.',
      'Strong focus on brand consistency and innovative design solutions.',
      'Collaborated with cross-functional teams to deliver high-quality projects.',
    ],
  },
  {
    title: 'SOFTWARE DEVELOPMENT',
    description: [
      '4 years of intensive software development training at 42 School.',
      'Strong problem-solving skills and algorithmic thinking.',
      'Experienced in collaborative coding and peer-to-peer learning.',
      'Focused on writing efficient, maintainable, and scalable code.',
    ],
  },
]
</script>
