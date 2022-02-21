<template>
  <div style="font-family: 'Montserrat', sans-serif;">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Instabook</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit="preventDefault()">
            <b-form-input size="sm" v-model="searchTerm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" @click="search(searchTerm)" class="my-2 my-sm-0">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em v-if="username">{{username}}</em>
            </template>
            <b-dropdown-item><router-link :to="{name: 'Profile'}" style="text-decoration:none;width:100%;">Profile</router-link></b-dropdown-item>
            <b-dropdown-item @click="logoutUser()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {

  data() {
    return {
      searchTerm: null
    }
  },

  computed:{
    ...mapGetters({
      username: 'getUsername'
    })
  },

  methods: {
    ...mapActions({
      logout: 'logout'
    }),

    ...mapMutations({
      setSearchTerm: 'setSearchTerm'
    }),

    search(searchTerm) {
      this.$router.push({name: 'Dashboard', params: {'search_term': searchTerm}})
    },

    logoutUser(){
      this.logout(this.user).then(() => {
        this.$router.push({name: 'Login'})
      })
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;1,100;1,300&display=swap');
</style>