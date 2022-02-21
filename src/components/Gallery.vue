<template>
  <b-container>
    <div class="row">
      <div class="col-md-4" v-for="image in images" :key="image.id" style="padding-right: 0;padding-left: 0;">
        <div class="card ratio ratio-1x1" style="align-items:center;">
          <img class="card-img-top" style="height: 100%; width: 100%; display: block;object-fit: cover; cursor: pointer;" @click="openImage(image)" :src="image.image" data-holder-rendered="true">
        </div>
      </div>
    </div>
    <ImageModal :image="image" :profilePicture="profilePicture" :profile="profile"/>
  </b-container>
</template>

<script>
import ImageModal from './ImageModal.vue'

export default {

  data() {
    return {
      image: ''
    }
  },

  components: {
    ImageModal
  },

  props: [
    'images',
    'profilePicture',
    'profile'
  ],

  methods: {
    openImage(image) {
      this.image = image
      this.$bvModal.show('modal-1')
    }
  }
}
</script>