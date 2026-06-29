<template>
  <NuxtLayout name="default">
    <section class="container flex flex-row flex-wrap lg:flex-nowrap">
      <div class="flex flex-wrap flex-col m-8 basis-auto lg:basis-3/4">
        <div class="text-sm breadcrumbs mb-8">
          <ul>
            <li><a href="/">Home</a></li>
            <li>Articles</li>
          </ul>
        </div>

        <div
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6 flex-row"
        >
          <article-card class="col-span-full" v-bind="featured"> </article-card>
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

const { page, navigation } = await useContent()
console.log(page)
console.log(navigation)

interface PageConf extends ParsedContent {
  title: string
  description: string
  keywords: string[]
}

const { data: pageConfig } = await useAsyncData('pageConfig', () =>
  queryContent<PageConf>('blog/index').findOne()
)

const title = pageConfig.value ? pageConfig.value.title : ''
const description = pageConfig.value ? pageConfig.value.description : ''
const keywords = pageConfig.value ? pageConfig.value.keywords : ''

const { data: articleRecords } = await useAsyncData('articleRecords', () =>
  queryContent('articles').sort({ date: 1, desc: 1 }).find()
)
const articles =
  articleRecords && articleRecords.value ? articleRecords.value.slice() : []
const featured = articles.shift()

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
</script>
