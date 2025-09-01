<template>
  <!-- <div
    class="absolute top-[2rem] pl-[15rem] w-[90%] h-px flex gap-4 hidden sm:flex"
    style="font-family: OfficeCode"
  >
    <div class="flex-auto">0210312032</div>
    <div class="flex-auto">CHROMATIC</div>
    <div class="flex-auto">-9.65046 -47.22233</div>
    <div class="h-px bg-white my-[0.6rem] border-b-1 flex-auto"></div>
  </div> -->
  <div
    class="md:block hidden absolute top-[2rem] pl-[2rem] w-[90%] h-px flex gap-4"
    :class="[
      'absolute top-0 flex w-full',
      'enterUpAnim',
      { 'enterAnim-active': show },
    ]"
  >
    <p class="marquee">
      <span>
        <template v-for="(word, idx) in marqueeWords" :key="idx">
          {{ word }}
          <img
            v-if="idx !== marqueeWords.length - 1"
            src="@/assets/images/star.webp"
            class="inline h-8 w-8 mr-4 relative -top-1.5"
            alt=""
          />
        </template>
        &nbsp;
      </span>
    </p>
    <p class="marquee marquee2">
      <span>
        <template v-for="(word, idx) in marqueeWords" :key="idx">
          {{ word }}
          <img
            v-if="idx !== marqueeWords.length - 1"
            src="@/assets/images/star.webp"
            class="inline h-8 w-8 mr-4 relative -top-1.5"
            alt=""
          />
        </template>
        &nbsp; &nbsp;
      </span>
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const marqueeText = `LOUIS VUITTON-INPI-ESENS-42-PORTFOLIO-ADLENE-FULL STACK-JAVASCRIPT-DESIGN-`
const marqueeWords = marqueeText.split('-')

const show = ref(false)
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 200)
})
</script>

<style scoped>
.marquee {
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  font-family: AestheticRegular;
  font-size: clamp(2.5rem, 4vw, 30rem);
}

.marquee span {
  display: inline-block;
  padding-left: 105%;
  animation: marquee 50s linear infinite;
}

.marquee2 span {
  animation-delay: -25s;
}

@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-105%, 0);
  }
}

img {
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
