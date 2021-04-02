<template>
    <section class="w-full grid grid-cols-4 gap-4 bg-white">
    <article-detail v-bind:article="article" class="col-span-3"/>
    <aside class="col-span-1 pr-4">
      <about-card/>
    </aside>
  </section>
</template>

<script>
  import ArticleDetail from '~/components/ArticleDetail.vue'
  import AboutCard from '~/components/AboutCard.vue'


  export default {
    components:{
      ArticleDetail,
      AboutCard
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
