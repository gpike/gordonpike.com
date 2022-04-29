<template>
  <section class="container mx-auto bg-white">
    <article-detail v-bind:article="article" class="col-span-3"/>
  </section>
</template>

<script>
  import ArticleDetail from '~/components/ArticleDetail.vue'

  export default {
    components:{
      ArticleDetail
    },
    async asyncData({ $content, params, error }) {
      console.info(params.slug)
      const article = await $content('articles', params.slug).fetch()
      return {
        article
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dummy {
    display: block;
  }
</style>
