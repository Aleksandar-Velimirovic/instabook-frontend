<template>
  <div class="container" style="margin-top:40px;text-align: center;">
    <h4 style="font-family: 'Montserrat', sans-serif;">Most followed profiles!</h4>
    <div class="row" style="align-items: center;">
      <div class="col-md-2 mt-3" v-for="profile in profiles" :key="profile.id" style="padding-right: 0;padding-left: 0; align-items: center;">
        <div class="avatarDiv">
           <b-avatar variant="info" style="margin-top:20px" class="profileAvatar" :src="profile.image" size="10rem"></b-avatar>
           <div style="font-family: 'Montserrat', sans-serif;text-align: center;margin-top:10px;">
             <span style="cursor:pointer;" @click="goToProfile(profile.id)"><b>{{ profile.username }}</b></span>
             <div>
              <p>Followers: <b>{{ profile.followers }}</b></p>
              <p>Following: <b>{{ profile.following}}</b></p>
             </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { profileService } from '../services/ProfileService'
import { mapGetters } from 'vuex'
import store from '../store/index'

export default {
  name: 'Dashboard',

  data() {
    return {
      profiles: []
    }
  },

  computed: {
    ...mapGetters({
      isUserLoggedIn: 'isUserLoggedIn'
    }),
  },

  methods: {
    goToProfile(profileId) {
      this.$router.push({name: 'Profile', params: {profile_id: profileId}})
    }
  },

  watch: {
    '$route.params.search_term': function (search_term) {
      profileService.getPopularProfiles(search_term).then(response => {
        this.profiles = response.data.profiles
      })
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!store.getters.isUserLoggedIn) {
      next({name: 'Login'})
    } else {
      next()
    }
  },

  created() {
    profileService.getPopularProfiles(this.$route.params.search_term, localStorage.getItem('userProfileId')).then(response => {
      this.profiles = response.data.profiles
    })
  },
}
</script>
<style scoped>
.profileAvatar {
  border: 2px solid #66a3ff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}
.avatarDiv {
  text-align: center;
}

@media only screen and (min-width: 760px) and (max-width: 1200px){
  .avatarDiv {
    margin-right: 10px;
    margin-left: 10px;
  }
}

</style>