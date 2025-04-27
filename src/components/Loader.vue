<template>
  <div
    id="loader"
    class="h-screen w-screen absolute z-10 flex justify-center items-center text-6xl bg-black"
    style="transition: all 5s ease-in-out; pointer-events: none"
  >
    <span class="loadSpinner"></span>
  </div>
</template>

<style>
.fade-out {
  opacity: 0;
}

.fade-out > span {
  opacity: 0;
  transition: all 1s ease-in-out;
}
.loadSpinner {
  width: 48px;
  height: 48px;
  border: 2px solid #fff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loadSpinner::after,
.loadSpinner::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  background: #ff3d00;
  width: 6px;
  height: 6px;
  transform: translate(150%, 150%);
  border-radius: 50%;
}
.loadSpinner::before {
  left: auto;
  top: auto;
  right: 0;
  bottom: 0;
  transform: translate(-150%, -150%);
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
