<template>
  <div v-bind:style=" isLogin ? 'background-color: rgba(var(--b3f,250,250,250),1);max-height:100%;' : 'background-color: white;max-height:100%;' " id="app">
    <Navbar v-if="!isLogin"/>
    <router-view/>
    <Footer v-if="isLogin"/>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  computed: {
    isLogin() {
      return this.$route.name === 'Login'
    }
  }
}

</script>

<style scoped>
#app {
  height: 100%;
}
</style>
