<template>
  <div class="mt-6">
      <div class="max-w-3xl  bg-cardback rounded-lg shadow-md">
          <img class="width-full rounded-tl-lg rounded-tr-lg" :src="article.cover_image" />
          <div class="px-10 py-6">
            <div class="flex justify-between items-center">
                <span class="font-light text-gray-600">{{ formatDate(article.date) }}</span>
                <a v-for="tag in article.tags" :key="tag" href="#"
                    class="px-2 py-1 bg-quinary text-gray-100 font-bold rounded hover:bg-quaternary">{{ tag }}</a>
            </div>
            <div class="mt-2"><a href="#" class="text-2xl text-gray-700 font-bold hover:underline">{{ article.title }}</a>
                <p class="mt-2 text-gray-600">{{ article.description }}</p>
            </div>
            <div class="flex justify-between items-center mt-4"><a :href="blogPath(article.slug)"
                    class="text-tertiary hover:underline">Read more</a>
                <div><a href="#" class="flex items-center"><img
                            :src="article.author_image"
                            alt="avatar" class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block">
                        <h1 class="text-gray-700 font-bold hover:underline">{{ article.author }}</h1>
                    </a></div>
            </div>
          </div>
      </div>
  </div>
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
      },

      blogPath: (blogName) => {
        return `/blog/${blogName}`
      }
    }

  }
</script>

<style lang="scss" scoped>
  .dummy {
    display: block;
  }
</style>
