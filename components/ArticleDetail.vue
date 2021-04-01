<template>
  <article class="py-12 px-4 bg-white">
    <img class="width-full" :src="article.cover_image" />
    <h1 class="mt-4 text-4xl text-center mb-4 font-semibold font-heading font-semibold"> {{ article.title }}</h1>
    <p class="text-center mb-5">
      <span>{{ formatDate(article.date) }}</span>
      <a class="ml-1 text-indigo-600 hover:underline" href="#"> {{ article.author }}</a>
    </p>
    <nuxt-content class="p-4":document="article" />
  </article>
</template>

<script>
  import { DateTime } from 'luxon'

  export default {
    props: {
      article: {
        type: Object,
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
