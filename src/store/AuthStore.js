import { authService } from '../services/AuthService'

export const AuthStore = {
  state:{
    token: localStorage.getItem('token'),
    errors:[],
    userProfileId: localStorage.getItem('userProfileId'),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId'),
  },

  mutations:{
    setErrors(state, errors){
        state.errors = errors
    },

    setToken(state, token){
        state.token = token
    },

    setUserProfileId(state, userProfileId){
      state.userProfileId = userProfileId
    },

    setUsername(state, username){
      state.username = username
    },

    setUserId(state, userId){
      state.userId = userId
    }
  },

  actions:{
    login(context, credentials) {
      authService.login(credentials).then(response => {

      authService.setHeaders({
        Authorization: `Bearer: ${response.data}`
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userProfileId', response.data.user_profile_id)
      localStorage.setItem('username', response.data.username)
      localStorage.setItem('userId', response.data.id)

      context.commit('setErrors', null)
      context.commit('setToken', response.data.token)
      context.commit('setUserProfileId', response.data.user_profile_id)
      context.commit('setUsername', response.data.username)
      context.commit('setUserId', response.data.id)
     })
    },
    // async login(context, credentials){
    //   try{
    //       const response = await authService.login(credentials)

    //       authService.setHeaders({
    //         Authorization: `Bearer: ${response.data}`
    //       })

    //       localStorage.setItem('token', response.data.token)
    //       localStorage.setItem('userProfileId', response.data.user_profile_id)
    //       localStorage.setItem('username', response.data.username)
    //       localStorage.setItem('userId', response.data.id)

    //       context.commit('setErrors', null)
    //       context.commit('setToken', response.data.token)
    //       context.commit('setUserProfileId', response.data.user_profile_id)
    //       context.commit('setUsername', response.data.username)
    //       context.commit('setUserId', response.data.id)
    //   }catch(exception){
    //     console.log(exception)
    //     context.commit('setErrors', exception.response.data.error)
    //   }
    // },
    async logout(context){
      localStorage.removeItem('token')
      localStorage.removeItem('userProfileId')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      context.commit('setToken', null)
      context.commit('setUserProfileId', null)
      context.commit('setUsername', null)
      context.commit('setUserId', null)
    }
  },

  getters:{
    getErrors (state) {
      return state.errors
    },

    isUserLoggedIn (state) {
      return !!state.token
    },

    getUserProfileId (state) {
      return state.userProfileId
    },

    getUsername (state) {
      return state.username
    },

    getUserId (state) {
      return state.userId
    }
  }
}