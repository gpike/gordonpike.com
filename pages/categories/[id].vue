<template>
  <NuxtLayout name="default">
    <section class="container flex flex-row flex-wrap lg:flex-nowrap">
      <div class="flex flex-wrap flex-col m-8 basis-auto lg:basis-3/4">
        <div class="text-sm breadcrumbs mb-8">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a hfref="/categories">Categories</a></li>
            <li>{{ titleCase(category) }}</li>
          </ul>
        </div>

        <div
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6 flex-row"
        >
          <article-card
            v-for="article in articles"
            :key="article.name"
            v-bind="article"
          >
          </article-card>
        </div>
      </div>
      <signup-card class="basis-auto lg:basis-1/4"></signup-card>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface PageConf extends ParsedContent {
  title: string
  description: string
  keywords: string[]
}

interface Params {
  id: string | string[]
}

const { data: pageConfig } = await useAsyncData('pageConfig', () =>
  queryContent<PageConf>('blog/index').findOne()
)

const title = pageConfig.value ? pageConfig.value.title : ''
const description = pageConfig.value ? pageConfig.value.description : ''
const keywords = pageConfig.value ? pageConfig.value.keywords : ''

const { params } = useRoute()
const slug: string = Array.isArray((params as Params).id)
  ? (params as Params).id[0]
  : ((params as Params).id as string)
const category = slug.replace(/_/g, ' ')
console.log(`category ${category}`)
const { data: articleRecords } = await useAsyncData('articleRecords', () =>
  queryContent('articles')
    .sort({ date: 1, desc: 1 })
    .where({ tags: { $contains: category } })
    .find()
)

const articles =
  articleRecords && articleRecords.value ? articleRecords.value : []

// console.log('Articles: ')
// console.log(articles)

useHead({
  title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    {
      hid: 'keywords',
      property: 'keywords',
      content: keywords,
    },
  ],
})

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
</script>
