<template>
  <!-- <a
    href="mailto:adlene.saba@gmail.com"
    class="absolute bottom-1 right-1 sm:right-auto sm:top-1 sm:left-1 btn btn-ghost normal-case text-xl text-300 z-10"
    style="font-family: Funny"
  >
    Mail Me
  </a> -->
  <!-- HTML !-->
  <a
    href="mailto:adlene.saba@gmail.com"
    class="button-85 normal-case text-xl text-300 z-10"
    role="button"
    >CONTACT ME</a
  >
</template>

<style scoped>
.button-85 {
  position: relative;
  padding: 1rem 1rem;
  border: none;
  outline: none;
  color: #fff;
  background: #fff;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-family: Funny;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  margin: -1rem 0;
  height: 3rem;
}

.button-85:before {
  content: '';
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #000000,
    #ffffff,
    #002bff,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.button-85:hover {
  transform: scale(1.05);
  box-shadow: 0 0 1000px 10px #fff;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 10px;
}
</style>
