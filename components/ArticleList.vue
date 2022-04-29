<template>
  <section class="grid grid-cols-3 gap-4">
    <article-card v-for="article in articles" :key="article.name" :article="article">
    </article-card>
  </section>
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
