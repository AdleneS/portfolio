<template>
  <Loader></Loader>
  <ContactMeButtonComponent></ContactMeButtonComponent>
  <main
    class="flex bg-transparent transition align-middle h-screen flex-col justify-center"
  >
    <router-view />
  </main>
  <PageTransition></PageTransition>
  <!-- <MyFooter></MyFooter> -->
</template>
