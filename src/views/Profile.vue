<template>
  <div class="container" style="font-family: 'Montserrat', sans-serif;">
    <div class="card mt-3" style="align-items:center;border:none">
        <div v-if="isUserProfile" @click="$refs.profileImage.click()" style="cursor:pointer">
            <b-avatar variant="info" style="margin-top:20px" class="profileAvatar" :src="profilePicture" size="10rem"></b-avatar>
        </div>
        <div v-else>
            <b-avatar variant="info" style="margin-top:20px" class="profileAvatar" :src="profilePicture" size="10rem"></b-avatar>
        </div>
        <input type="file" ref="profileImage" style="display: none" @change="updateProfilePicture">
        <span class="mt-2"><h4>{{ profile.username }}</h4></span>
        <div style="display:flex;margin-bottom:20px;">
            <div class="ml-3" style="text-align:center;">
                <p>Posts</p>
                <span v-if="profile.images" class="mt-0"><b>{{profile.images.length}}</b></span>
            </div>
            <div class="ml-3" style="text-align:center;">
                <p>Followers</p>
                <span style="margin-left:2px"><b>{{ profile.followers }}</b></span>
            </div>
            <div class="ml-3" style="text-align:center;">
                <p>Following</p>
                <span><b>{{ profile.following }}</b></span>
            </div>
        </div>
        <input type="file" ref="image" style="display: none" @change="addImage">
        <label v-if="isUserProfile" class="formLabel" @click="$refs.image.click()" for="input-file">
            <div>+</div>
        </label>
        <div class="line"></div>
        <div v-if="!isUserProfile" class="mb-2">
            <button v-if="isFollowing" class="btn btn-outline-primary" @click="unfollow()">Unfollow</button>
            <button v-if="!isFollowing" class="btn btn-outline-primary" @click="follow()">Follow</button>
        </div>
    </div>
    <Gallery :images="profile.images" :profilePicture="profilePicture" :profile="profile"/>
  </div>
</template>

<script>
import Gallery from '../components/Gallery.vue'
import { profileService } from '../services/ProfileService'
import { mapGetters } from 'vuex'

export default {

    data() {
        return {
            profile: {},
            isFollowing: null
        }
    },

    components: {
        Gallery
    },

    computed:{
        ...mapGetters({
            userId: 'getUserId',
            userProfileId: 'getUserProfileId'
        }),
        profilePicture() {
            return this.profile.image ? this.profile.image : '../assets/default-profile-pic.jpg';
        },
        isUserProfile() {
            return !this.$route.params.profile_id;
        }
    },

    methods: {
        updateProfilePicture(event) {
            let profileImage = event.target.files[0];
            let fd = new FormData();
            fd.set('profile_image', profileImage)
            fd.set('user_id', this.userId)
            profileService.updateProfilePicture(fd).then(response => {
                this.profile = response.data.profile
            })
        },
        addImage(event) {
            let image = event.target.files[0];
            let fd = new FormData();
            fd.set('image', image)
            fd.set('user_id', this.userId)
            profileService.addImage(fd).then(response => {
                this.profile.images = response.data.images
            })
        },

        follow() {
            let followData = {};
            followData.profile_id = this.profile.id
            followData.user_profile_id = this.userProfileId
            profileService.follow(followData).then(response => {
                this.profile = response.data.profile;
                this.isFollowing = true
            })
        },

        unfollow() {
            let unfollow = {};
            unfollow.profile_id = this.profile.id
            unfollow.user_profile_id = this.userProfileId
            profileService.unfollow(unfollow).then(response => {
                this.profile = response.data.profile;
                this.isFollowing = false
            })
        }
    },

    watch: {
        '$route.params.profile_id': function (profile_id) {
            if (!profile_id) {
                profileService.getProfileByUser(this.userId).then(r => {
                    this.profile = r.data.profile;
                })
                return;
            }
        }
    },

    created() {
        if (!this.$route.params.profile_id) {
            console.log('profile by user')
            profileService.getProfileByUser(this.userId).then(r => {
                this.profile = r.data.profile;
            })
            return;
        }
        let followData = {};
        followData.profile_id = this.$route.params.profile_id
        followData.user_profile_id = this.userProfileId

        profileService.isFollowing(followData).then(response => {
            this.isFollowing = response.data.isFollowing;
        })
        profileService.getProfile(this.$route.params.profile_id).then(r => {
            this.profile = r.data.profile;
        })
    }
}
</script>

<style scoped>
.formLabel {
    color:  #66a3ff;
    font-size: 25px;
    width: 40px;
    height: 40px;
    border: 2px solid #212529;
    border-radius: 50%;
    cursor: pointer;
    background-color: white;
    text-align: center;   
}
.formLabel div{
    padding-top: -10px;
}

.formLabel:hover {
    color:  black;
    background-color: #66a3ff;
}

.profileAvatar {
    border: 2px solid #66a3ff;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

/* .line {
    height: 2px;
    width: 1000px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    background-color: #66a3ff;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
} */

</style>