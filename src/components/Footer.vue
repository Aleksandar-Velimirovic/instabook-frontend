<template>
  <footer>
    <div class="main-div">
      <div class="line-one"></div>
        <div class="footer-links">
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Development</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      <!-- <div class="line-two"></div> -->
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style scoped>

  .main-div {
    background-color: rgba(var(--b3f,250,250,250),1);
  }

   .instabook-link {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }

   .footer-links {
     display: flex;
     justify-content: center;
     flex-direction: row;
     text-decoration: none;
     margin-top: 150px;
   }

   .footer-links ul {
     display: flex;
     justify-content: space-between;
     flex-direction: row;
     gap: 30px;
     list-style-type: none;
     padding-left: 0px;
   }

   .footer-links ul a {
    text-decoration: none;
  }

   @media only screen and (max-width: 500px) {
    .footer-links ul {
     font-size: 10px;
   }
  }

   @media only screen and (min-width: 500px) and (max-width: 850px){
   .footer-links {
     padding-bottom: 20px;
   }
  }
</style>