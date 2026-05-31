<template>
  <div class="absolute top-0 w-full overflow-hidden">
    <div class="marquee-track">
      <span v-for="n in 2" :key="n" class="marquee-content">
        <template v-for="(word, idx) in marqueeWords" :key="idx">
          {{ word }}
          <img
            src="@/assets/images/star.webp"
            class="inline h-8 w-8 mr-4 relative -top-1.5"
            alt=""
          />
        </template>
        &nbsp;&nbsp;
      </span>
    </div>
  </div>
</template>

<script setup>
const marqueeWords =
  'LOUIS VUITTON-INPI-ESENS-42-PORTFOLIO-ADLENE-FULL STACK-JAVASCRIPT-DESIGN'.split(
    '-',
  )
</script>

<style scoped>
.marquee-track {
  display: block;
  width: max-content;
  white-space: nowrap;
  font-family: AestheticRegular;
  font-size: clamp(2.5rem, 4vw, 30rem);
  animation: scroll 50s linear infinite;
}

.marquee-content {
  display: inline-block;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

img {
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
