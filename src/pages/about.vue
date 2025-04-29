<template>
  <PageTitle title=" MY EXPERTISES" />
  <HeaderComponent></HeaderComponent>
  <div class="flex flex-col justify-center p-6">
    <div class="inline-grid grid-flow-row auto-rows-min gap-6 align-middle">
      <ExpertiseComponent
        v-for="(expertise, i) in expertises"
        :expertise="expertise"
        :key="i"
      />
    </div>
  </div>
  <Footer pageTitle="Expertises"></Footer>
</template>

<script setup lang="ts">
const expertises = [
  {
    title: 'FRONTEND DEV REACT, VUE',
    description: [
      '3 years of frontend development experience.',
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
