<template>
  <div class="bg-cardalternate max-w-4xl m-4 my-6 rounded-lg shadow-md">
    <div class="flex flex-col w-full items-center">
      <h3 class="w-full bg-primary text-white font-bold rounded-tl-lg rounded-tr-lg text-center pt-2 pb-2">About</h3>
      <video class="hero-video inline-block w-32 rounded-full ring-4 ring-white pt-2" poster="/videos/gpyes.jpeg" id="bgvid" playsinline autoplay muted loop>
        <source src="/videos/gpyes.webm" type="video/webm">
      </video>
      <div class="text-lg text-gray-700 font-bold pt-2">
        Story Teller | Solver | Leader
      </div>
      <div class="text-base text-gray-600 pt-2">
        A leader in technology and strategy.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
