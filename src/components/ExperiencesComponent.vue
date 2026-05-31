<template>
  <div
    :class="[
      'exp-card group relative overflow-hidden rounded-2xl',
      props.exp.colorClass,
      { 'enterAnim-active': show },
      'enterLeftAnim',
    ]"
  >
    <div
      class="absolute w-[calc(100%+1px)] inset-0 flex translate-y-full flex-col overlay-blur p-6 transition-transform duration-500 ease-in-out group-hover:translate-y-0"
    >
      <div>
        <h3
          class="text-3xl font-extrabold text-white drop-shadow-lg p-0"
          style="font-family: Funny"
        >
          {{ props.exp.job }}
        </h3>
        <h2
          class="text-xl font-thin text-white drop-shadow-lg"
          style="font-family: Funny"
        >
          {{ props.exp.country }} · {{ props.exp.duration }}
        </h2>
        <hr class="mt-4" />
      </div>

      <div class="flex flex-1 items-center">
        <ul
          v-if="props.exp.details && props.exp.details.length"
          class="list-none space-y-3 text-white"
        >
          <li
            v-for="(description, i) in props.exp.details"
            :key="i"
            class="flex items-center"
          >
            <img
              src="@/assets/images/star.webp"
              class="mr-3 h-6 w-6 flex-shrink-0 rotation-animation"
              alt=""
            />
            <span class="text-xl" style="font-family: Funny">{{
              description
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  exp: { type: Object, required: true },
})

const show = ref(false)
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 200)
})
</script>

<style>
.overlay-blur {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.exp-card {
  height: 28rem;
  flex: 1 1 auto;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
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
