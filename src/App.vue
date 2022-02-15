<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  body,ul,li,h1,h2,h3,p,span {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }

</style>
