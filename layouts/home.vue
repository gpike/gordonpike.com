<template>
  <div class="bg-background">
    <heading></heading>
    <div class="flex">
      <content>
        <nuxt/>
      </content>
      <aside>
       <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-secondary" src="~/static/images/gpike.png" alt="Gordon Pike">
       <video class="hero-video inline-block h-32 w-32 rounded-full ring-4 ring-white" poster="/videos/gpyes.jpeg" id="bgvid" playsinline autoplay muted loop>
         <source src="/videos/gpyes.webm" type="video/webm">
       </video>
      </aside>
    </div>
    <footer></footer>

  </div>
</template>

<script>
  import Heading from '~/components/Heading.vue'
  import Footer from '~/components/Footer.vue'
  export default {
    components: {
      Heading,
      Footer
    },
    mounted() {
      let vid = this.$el.getElementsByClassName('hero-video')[0];
      console.log(vid)
      vid.playbackRate = 0.5;
    }

  }
</script>

<!--
<style lang="sass" scoped>

</style>
-->
