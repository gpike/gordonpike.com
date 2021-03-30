<template>
  <div class="container">
    <article-list :articles="articles">

    </article-list>
  </div>
</template>

<script>
import ArticleList from '~/components/ArticleList.vue'

  export default {
    components: { ArticleList },
    name: 'Home',
    layout: 'home',
    async asyncData ({ $content, params }) {
      const articles = await $content('articles')
        .sortBy('date')
        .where({ tags: { $contains: `${params.category.toUpperCase()}` } })
        .fetch()
      return { articles }
    },
  }
</script>

<!--
<style lang="sass">
</style>
-->
