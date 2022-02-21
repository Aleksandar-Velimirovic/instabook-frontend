<template>
  <div class="container main-div">
    <div class="instabook-image"> 
      <p class="instabook-text-one">Join Instabook today!</p>
      <p class="instabook-text-two">Over 500 million accounts made!</p>
    </div>
    <b-card 
      tag="article"
      style="width:350px;font-family: 'Montserrat', sans-serif; box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);"
      class="text-center"
      
    >
      <h1 style="margin-bottom: 20px">Instabook</h1>
      <b-form @submit="preventDefault()">
        <b-form-group
          id="input-group-1"
        >
          <b-form-input
            id="input-1"
            v-model="user.email"
            type="email"
            placeholder="email or username"
            required
            style="border-radius:2px;font-size:13px;"
          ></b-form-input>
          <small v-if="errors['email']" style="color:red;">*{{errors['email'][0]}}</small>
        </b-form-group>

        <b-form-group id="input-group-2" class="mt-2">
          <b-form-input
            id="input-2"
            v-model="user.password"
            type="password"
            placeholder="password"
            required
            style="border-radius:2px;font-size:13px;"
          ></b-form-input>
          <small v-if="errors['password']" style="color:red;">*{{errors['password'][0]}}</small>
        </b-form-group>
        <b-button class="login-button"  variant="btn btn-primary" @click="loginUser()">Login</b-button>
      </b-form>
      <div class="line"></div>
      <p style="margin-top: 30px">Don't have an account? Register <a style="text-decoration:none" v-b-modal.modal-register>here</a></p>
    </b-card>
    <Register/>
  </div>
</template>

<script>
import Register from "../components/Register"
import { authService } from "../services/AuthService"
import { mapMutations } from 'vuex'

export default {
  data(){
    return{
      user:{},
      errors:[]
    }
  },
  components: {
    Register
  },
  
  methods:{
    ...mapMutations({
      setToken: 'setToken',
      setUserProfileId: 'setUserProfileId',
      setUsername: 'setUsername',
      setUserId: 'setUserId'
    }),
    loginUser() {
      authService.login(this.user).then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userProfileId', response.data.user_profile_id)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('userId', response.data.id)

        this.setToken(response.data.token)
        this.setUserProfileId(response.data.user_profile_id)
        this.setUsername(response.data.username)
        this.setUserId(response.data.id)

        this.$router.push({name: 'Dashboard'})
      }).catch(error => {
        this.errors = error.response.data.errors
      })
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;1,100;1,300&display=swap');

  .main-div {
    background-color: rgba(var(--b3f,250,250,250),1);
    display:flex;
    justify-content:space-between;
    padding-left: 200px;
    padding-right: 200px;
    padding-top: 150px;
  }

  .login-input{
    border-radius:2px;
    font-size:13px;
    background-color:red;
  }

  .login-input:focus {
    box-shadow: none;
  }

  .login-button {
    border-radius: 2px;
    font-size: 13px;
    width: 100px;
    background-color:#66a3ff;
    border: none;
    margin-top: 35px;
  }

  .line {
    background-color:#66a3ff;
    height: 2px;
    margin-top: 40px;
  }

  .instabook-image {
    height: 380px;
    width: 350px;
    border-radius: 30px;
    background-image: url("../assets/instabook-image.jpg");
    background-size: contain;
    background-size: cover;
    font-family: 'Montserrat', sans-serif;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  }

  .instabook-text-one {
    color: white; 
    margin-top: 2px;
    margin-left: 68px;
    font-size: 20px; 
    text-shadow: 1px 1px 2px black; 
  }

  .instabook-text-two {
    color: white;
    margin-top: 315px;
    margin-left: 30px;
    font-size: 18px;
    text-shadow: 1px 1px 2px black;
  }

  @media only screen and (max-width: 1400px) {
    .main-div {
      padding-left: 100px;
      padding-right: 100px;
    }
  }

  @media only screen and (max-width: 1200px) {
    .main-div {
      padding-left: 80px;
      padding-right: 80px;
    }
  }

  @media only screen and (max-width: 1000px) {
    .main-div {
      padding-left: 100px;
      padding-right: 100px;
    }
  }

  @media only screen and (min-width: 851px) and (max-width: 999px){
    .main-div {
      padding-left: 0px;
      padding-right: 0px;
    }

    .instabook-text-one {
      margin-top: 3px;
      margin-left: 78px;
      font-size: 18px; 
    }

    .instabook-text-two {
      margin-top: 290px;
      margin-left: 38px;
      font-size: 17px; 
    }
  }

  @media only screen and (max-width: 850px) {
    .main-div {
     justify-content:center;
    }

    .instabook-image {
      display: none;
    }
  }
</style>