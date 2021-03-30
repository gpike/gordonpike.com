<template>
  <div>
    <article-detail v-bind:article="article"></article-detail>
  </div>
</template>

<script>
  import ArticleDetail from '../../components/ArticleDetail'

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
