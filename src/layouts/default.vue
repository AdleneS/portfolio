<template>
  <Loader></Loader>
  <main
    class="flex bg-transparent transition align-middle h-screen flex-col justify-center"
  >
    <router-view />
  </main>
  <ContactMeButtonComponent></ContactMeButtonComponent>
  <PageTransition></PageTransition>
  <!-- <MyFooter></MyFooter> -->
</template>
