<template>
  <div class="bg-background grid grid-cols-1 gap-2">
    <heading class="col-span-full"></heading>
      <nuxt/>
    <footer class="col-span-full"></footer>
  </div>
</template>

<script>
  import Heading from '~/components/Heading.vue'
  import Footer from '~/components/Footer.vue'
  export default {
    components: {
      Heading,
      Footer
    }
  }
</script>
