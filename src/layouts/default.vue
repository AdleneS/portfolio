<template>
  <Loader></Loader>
  <main class="flex bg-transparent transition align-middle h-screen p-6">
    <router-view />
  </main>
  <ContactMeButtonComponent></ContactMeButtonComponent>
  <PageTransition></PageTransition>
  <!-- <MyFooter></MyFooter> -->
</template>
