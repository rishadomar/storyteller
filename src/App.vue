<template>
  <div id="app" class="py-6">
    <Logo />
    <div id="nav" class="my-6 mx-4">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Logo from './components/Logo'
export default {
  components: {
    Logo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  max-width: 380px;
  margin: 0 auto;
  background-color: #51d0de;
}

#nav {
  padding: 5px 20px;
  border-top: 1px solid theme('colors.purple');
  border-bottom: 1px solid theme('colors.purple');
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
