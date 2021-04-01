<template>
  <div class="grid grid-cols-3 gap-4">
    <lead-article-card class="col-span-3" :article="leadArticle">

    </lead-article-card>
    <article-card v-for="article in otherArticles" :key="article.name" :article="article">

    </article-card>

  </div>
</template>

<script>
  import { DateTime } from 'luxon'
import ArticleCard from './ArticleCard.vue'
import LeadArticleCard from './LeadArticleCard.vue'

  export default {
  components: { ArticleCard },
    props: {
      articles: {
        type: Array,
        default: () => {
          return {
            title: ''
          }
        }
      }
    },
    data: function() {
      const articleList = this.articles.slice()
      return {
        leadArticle: articleList.shift(),
        otherArticles: articleList
      }
    },

    methods: {
      formatDate: (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('en', options)
      }
    }

  }
</script>

<style lang="scss" scoped>
  .dummy {
    display: block;
  }
</style>
