<template>
  <div class="home space-y-6 h-screen flex flex-col items-center justify-center">
    <font-awesome-icon icon="fa-solid fa-binoculars" size="10x"/> 
    <p class="text-3xl font-bold">Welcome to the ISS Auditing Tool</p>
    <p class="text-xl">Download the tool <a class="text-main-green" href="https://cli.vuejs.org" target="_blank" rel="noopener">here</a>.</p>
    <p class="text-lg">Want to learn more about this project? Check out our<br>check out our <RouterLink class="text-main-green" to="/about">about</RouterLink> page</p>
    <p class="text-lg">Have any questions or problems? <br>check out our <RouterLink class="text-main-green" to="/contact">contact</RouterLink> page</p>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
  }
}
</script>