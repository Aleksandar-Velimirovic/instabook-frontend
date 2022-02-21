import Vue from 'vue'
import Vuex from 'vuex'
import { AuthStore } from './AuthStore'
import { ProfileStore } from './ProfileStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    AuthStore,
    ProfileStore
  }
})

export default store
