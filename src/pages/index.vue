<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center relative"
  >
    <div
      style="font-family: Dirty"
      class="sm:hidden flex flex-nowrap flex-col items-center text-white"
    >
      <div style="font-size: clamp(3rem, 10vw, 10rem)">hI, i'm AdlÈnE</div>
      <div style="font-size: clamp(1.6rem, 5vw, 10rem)">
        fUll-StaCk deVelOpER
      </div>
    </div>
    <div class="scroll top-[8rem] relative"></div>
  </div>
  <!-- <div class="separator">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        class="shape-fill"
      ></path>
    </svg>
  </div> -->
</template>
<script setup>
// import { SiteState } from '@/utils/state'
</script>

<style>
.separator {
  position: absolute;
  top: -80px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.separator svg {
  position: relative;
  display: block;
  width: calc(102% + 1.3px);
  height: 80px;
}

.separator .shape-fill {
  fill: rgb(255, 246, 214);
}
.maskAnimation {
  padding: 10px; /* control the thickness of the gradient "border" */
  border: 10px solid white;
  mask:
    linear-gradient(#000000 0 0),
    radial-gradient(#000 70%, #0000 71%) content-box 50% / var(--_s, 0% 0%)
      no-repeat;
  mask-composite: exclude;
  transition: 0.5s;
  cursor: pointer;
  filter: none();
}
.maskAnimation:hover {
  filter: invert();
  /* --_s: 150% 150%; */
}

.scroll {
  width: 30px;
  height: 30px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  position: relative;
  animation: down 1.5s infinite;
  -webkit-animation: down 1.5s infinite;
  &::before {
    content: '';
    position: absolute;
    top: 7px;
    left: 9px;
    width: 9px;
    height: 9px;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: rotate(-45deg);
  }
}

@keyframes down {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translateY(15px);
  }
  40% {
    transform: translate(0);
  }
}

@-webkit-keyframes down {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translateY(15px);
  }
  40% {
    transform: translate(0);
  }
}
</style>
