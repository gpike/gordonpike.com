<template>
  <div class="flex flex-col">
    <article-card v-for="article in articles" :key="article.name" :article="article">

    </article-card>

  </div>
</template>

<script>
  import { DateTime } from 'luxon'
import ArticleCard from './ArticleCard.vue'

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
