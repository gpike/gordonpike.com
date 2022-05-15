<template>
  <div class="container mx-auto grid grid-cols-4 gap-4">
    <article-list class="col-span-full" :articles="articles"> </article-list>
  </div>
</template>

<script>
import ArticleList from '~/components/ArticleList.vue'

export default {
  name: 'CategoryComponent',
  components: {
    ArticleList,
  },
  layout: 'BlogPage',
  async asyncData({ $content, params }) {
    const category = params.category.replace(/_/g, ' ')
    const articles = await $content('articles')
      .sortBy('date')
      .where({ tags: { $contains: `${category}` } })
      .fetch()
    return { articles }
  },
}
</script>

<!--
<style lang="sass">
</style>
-->
