<template>
  <div class="items-center justify-center">
    <h3
      class="mb-4 font-extrabold tracking-tight text-white"
      style="font-size: clamp(1rem, 6vw, 3rem)"
    >
      {{ props.expertise.title }}
    </h3>
    <ul
      class="list-none text-white"
      style="font-size: clamp(0.8rem, 2vw, 1.5rem)"
    >
      <li
        v-for="(description, i) in expertise.description"
        :key="i"
        class="before:content-['-'] before:mr-2"
      >
        {{ description }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(['expertise'])
</script>
