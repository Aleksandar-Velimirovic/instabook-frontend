<template>
  <b-modal id="modal-1" hide-header hide-footer>
    <div class="card ratio-1x1" style="align-items:center;">
      <img class="card-img-top" style="height: 100%; width: 100%; display: block;" @click="openImage()" :src="image.image" data-holder-rendered="true">
    </div>
  </b-modal>
</template>

<script>
export default {

  name: 'SingleImage',

  props: [
    'image'
  ]
}
</script>

<style>

</style>