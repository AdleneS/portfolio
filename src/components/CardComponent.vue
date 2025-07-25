<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <p class="title">{{ props.experience.title }}</p>
      </div>
      <div class="flip-card-back">
        <p class="title">{{ props.experience.title }}</p>
        <span
          v-for="(description, i) in props.experience.details"
          :key="i"
          class="before:mr-2 description-item"
        >
          <span>
            {{ description }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  experience: {
    type: Object as () => {
      title: string
      details: string[]
      link: string
    },
    default: () => {
      return {
        title: '',
        details: [],
        link: '',
      }
    },
  },
})
function splitToLetters(text: string) {
  return text.split('')
}
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  flex: 1 1 auto;
  width: 190px;
  height: 50%;
  perspective: 1000px;
  font-family: funny;
}

.title {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  margin: 0;
}

.flip-card-inner {
  position: relative;
  font-size: 1.5rem;

  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 1rem;
}

.flip-card-front {
  background: linear-gradient(120deg, rgb(0, 0, 0) 30%, rgb(0, 0, 0) 88%);

  color: white;
}

.flip-card-back {
  background: linear-gradient(120deg, rgb(16, 16, 16) 30%, rgb(21, 21, 21) 88%);
  color: white;
  transform: rotateY(180deg);
}
</style>
