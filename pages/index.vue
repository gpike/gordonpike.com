<template>
  <section class="container mx-auto grid grid-cols-4 gap-4">
    <lead-article-card class="col-span-3" :article="featured"/>
    <aside class="col-span-1 pr-4">
      <about-card/>
    </aside>
    <div class="col-span-full grid grid-cols-3 gap-4">
      <article-card v-for="article in articles" :key="article.name" :article="article">
      </article-card>
    </div>
  </section>
</template>

<script>
  import ArticleList from '~/components/ArticleList.vue'
  import AboutCard from '~/components/AboutCard.vue'

  export default {
    components: {
      ArticleList,
      AboutCard
    },
    name: 'Home',
    layout: 'default',
    async asyncData ({ $content, params }) {
      const articleRecords = await $content('articles').sortBy('date','desc').fetch()
      const articles = articleRecords.slice()
      return {
        featured: articles.shift(),
        articles
      }
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
