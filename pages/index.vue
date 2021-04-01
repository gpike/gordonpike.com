<template>
  <section class="container">
    <article-list :articles="articles">
    </article-list>
  </section>
</template>

<script>
import ArticleList from '~/components/ArticleList.vue'

  export default {
    components: { ArticleList },
    name: 'Home',
    layout: 'home',
    async asyncData ({ $content, params }) {
      const articles = await $content('articles').sortBy('date','desc').fetch()
      return { articles }
    }
  }
</script>

<!--
<style lang="scss">

  video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
-->
