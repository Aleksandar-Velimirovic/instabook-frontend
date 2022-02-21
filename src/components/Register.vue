<template>
    <b-modal
      id="modal-register"
      ref="modal"
      @hide="hideModal()"
      hide-header
      hide-footer
      style="font-family: 'Montserrat', sans-serif;"
    >
      <div v-if="showRegisteredMessage" class="alert alert-success">
        Successfully registered
      </div>
      <b-form class="form" @submit="preventDefault()">
        <b-form-group
          id="input-group-1"
        >
          <b-form-input
            id="input-1"
            v-model="user.email"
            type="email"
            placeholder="email"
            required
            style="border-radius:2px;font-size:13px;"
          ></b-form-input>
          <small v-if="errors['email']" style="color:red;">*{{errors['email'][0]}}</small>
        </b-form-group>

        <b-form-group id="input-group-3" class="mt-2">
          <b-form-input
            id="input-2"
            v-model="user.name"
            type="text"
            placeholder="username"
            required
            style="border-radius:2px;font-size:13px;"
          ></b-form-input>
          <small v-if="errors['name']" style="color:red;">*{{errors['name'][0]}}</small>
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

        <b-form-group id="input-group-2" class="mt-2">
          <b-form-input
            id="input-2"
            v-model="user.repeat_password"
            type="password"
            placeholder="repeat password"
            required
            style="border-radius:2px;font-size:13px;"
          ></b-form-input>
          <small v-if="errors['repeat_password']" style="color:red;">*{{errors['repeat_password'][0]}}</small>
        </b-form-group>
        <div style="text-align:center">
          <b-button v-if="!showRegisteredMessage" class="login-button" variant="btn btn-primary" @click="register()">Signup</b-button>
          <b-button v-if="showRegisteredMessage" class="login-button" variant="btn btn-success" @click="hideModal()">Ok</b-button>
        </div>
      </b-form>
    </b-modal>
</template>

<script>
import { authService } from "../services/AuthService"
import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        user: {},
        errors: {},
        showRegisteredMessage: false
      }
    },
    methods: {
      ...mapActions({
          login: 'login'
      }),
      register(){
        authService.register(this.user).then(() => {
            this.$nextTick(() => {
              this.showRegisteredMessage = true
              this.errors = null
            })
        }).catch(error => {
          this.errors = error.response.data.errors
        })
      },
      hideModal(){
        this.user = {}
        this.errors = {}
        this.$bvModal.hide('modal-register')
      },
      removeErrorName(){
        if(this.errors.name){
          this.errors.name = null
        }
      },
      removeErrorEmail(){
        if(this.errors.email){
            this.errors.email = null
        }
      },
      removeErrorPassword(){
        if(this.errors.password){
            this.errors.password = null
        }
      },
      removeErrorConfirmPassword(){
        if(this.errors.repeat_password){
            this.errors.repeat_password = null
        }
      }
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;1,100;1,300&display=swap');
.form {
  font-family: 'Montserrat', sans-serif;
}
.login-button {
  border-radius: 2px;
  font-size: 13px;
  width: 100px;
  background-color:#66a3ff;
  border: none;
  margin-top: 35px;
  text-align: center;
}
</style>