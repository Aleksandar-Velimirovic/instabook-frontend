<template>
  <b-modal id="modal-1" hide-header hide-footer style="font-family: 'Montserrat', sans-serif;">
    <div class="card" style="border:none;">
      <img class="card-img-top" style="height: 100%; width: 100%; display: block;" @click="openImage()" :src="image.image" data-holder-rendered="true">
      <div class="card-body">
          <b-avatar variant="info" :src="profilePicture" size="2.5rem" style="margin-right:5px;"></b-avatar>
          <span style="font-family: 'Montserrat', sans-serif;"> <b>{{ profile.username }}</b>: This is some image description</span>
          <div class="list-group mt-2" v-for="comment in image.comments" :key="comment.id">
            <div class="list-group-item" style="border-radius:0px;cursor:pointer;font-family: 'Montserrat', sans-serif;">
              <b-avatar variant="info" :src="comment.profile.image" size="2.5rem" style="margin-right:5px;"></b-avatar> {{ comment.content }}
            </div>
          </div>
          <input type="text" class="form-control mt-2" style="box-shadow:none;font-family: 'Montserrat', sans-serif;" placeholder="add comment..." v-model="content">
          <p><button class="btn btn-outline-primary mt-2" style="font-family: 'Montserrat', sans-serif;" @click="addComment(content)">Save</button></p>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { commentService } from '../services/CommentService'

export default {

    name: 'ImageModal',

    data() {
      return {
        content: ''
      }
    },

    props: [
        'image',
        'profilePicture',
        'profile'
    ],

    computed: {
    ...mapGetters({
        userProfileId: 'getUserProfileId'
    }),
      profileId() {
        return this.profile.id;
      },
      imageId() {
        return this.image.id
      },
  },

  methods: {
    addComment(content) {
      let comment = {};
      comment.content = content
      comment.profile_id = this.userProfileId
      comment.image_id = this.imageId
      commentService.addComment(comment).then(response => {
        this.image.comments = response.data.comments
        this.content = ''
      })
    }
  }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;1,100;1,300&display=swap');

    /* .profileAvatar {
    border: 2px solid #66a3ff;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
} */

</style>