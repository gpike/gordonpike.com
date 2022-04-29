<template>
  <div class="container mx-auto grid grid-cols-4 gap-4">
    <article-list class="col-span-3" :articles="articles">
    </article-list>
    <aside class="col-span-1 pr-4">
      <about-card/>
    </aside>
  </div>
</template>

<script>
  import ArticleList from '~/components/ArticleList.vue'
  import AboutCard from '~/components/AboutCard.vue'

  export default {
    components: {
      ArticleList,
      AboutCard
    },
    name: 'Category',
    async asyncData ({ $content, params }) {
      const category = params.category.replace(/_/g, ' ');
      const articles = await $content('articles')
        .sortBy('date')
        .where({ tags: { $contains: `${category}`} })
        .fetch()
      return { articles }
    },
  }
</script>

<!--
<style lang="sass">
</style>
-->
