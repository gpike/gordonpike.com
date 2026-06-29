<template>
  <div class="bg-cardalternate max-w-4xl m-4 my-6 rounded-lg shadow-md">
    <div class="flex flex-col w-full items-center">
      <h3
        class="w-full bg-secondary text-white uppercase font-bold rounded-tl-lg rounded-tr-lg text-center pt-2 pb-2"
      >
        Join
      </h3>
      <video
        id="bgvid"
        class="p-4 hero-video inline-block w-64 ring-4 ring-white pt-2"
        poster="/images/gp.png"
        playsinline
        autoplay
        muted
        loop
      >
        <source
          src="/videos/pexels-stefanie-hinton-6590365.webm"
          type="video/webm"
        />
      </video>
      <div class="text-lg text-gray-700 font-bold pt-2">
        Join Our Email List
      </div>
      <div class="p-4 text-base text-gray-600 pt-2">
        Get helpful tips on All Things Tech.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const vid = this.$el.getElementsByClassName('hero-video')[0]
    console.log(vid)
    vid.playbackRate = 0.5
  },
}
</script>

<!--
<style lang="sass" scoped>

</style>
-->
