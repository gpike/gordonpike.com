<template>
  <div class="bg-background grid grid-cols-3 gap-4">
    <heading class="col-span-full"></heading>
    <content class="col-span-2 pl-6">
      <nuxt/>
    </content>
    <aside class="col-span-1 pr-4">
      <about-card/>
    </aside>
    <footer class="col-span-full"></footer>

  </div>
</template>

<script>
  import Heading from '~/components/Heading.vue'
  import Footer from '~/components/Footer.vue'
  import AboutCard from '~/components/AboutCard.vue'
  export default {
    components: {
      Heading,
      Footer,
      AboutCard
    }

  }
</script>

<!--
<style lang="sass" scoped>

</style>
-->
