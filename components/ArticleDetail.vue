<template>
  <article class="bg-white grid grid-cols-1">
    <img class="w-full" :src="article.cover_image" />
    <h1 class="mt-4 text-4xl text-center mb-4 font-semibold font-heading font-semibold"> {{ article.title }}</h1>

    <div class="border-t border-b border-gray-400 mx-6 my-4 pt-4">
      <p class="text-center p-4 mb-5">
        <span>{{ formatDate(article.date) }}</span>
        <a class="ml-1 text-indigo-600 hover:underline" href="#"> {{ article.author }}</a>
      </p>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <nuxt-content class="col-span-3 article-body px-8 font-body font-thin text-lg leading-loose prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto" :document="article" />
      <aside class="col-span-1 pr-4">
        <about-card/>
      </aside>
    </div>
  </article>
</template>

<script>
  import { DateTime } from 'luxon'
  import AboutCard from '~/components/AboutCard.vue'


  export default {
    components:{
      AboutCard
    },
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

<style lang="scss">
  .article-body {
    h2 {
      display: block;
      font-size: 1.5em;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      font-weight: bold;
    }
  }
</style>
