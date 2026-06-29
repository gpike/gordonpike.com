<template>
  <NuxtLayout name="default">
    <section class="flex flex-row flex-wrap lg:flex-nowrap">
      <div
        class="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 lg:gap-4 m-8"
      >
        <article-card class="col-span-full" featured="true" v-bind="featured">
        </article-card>
        <article-card
          v-for="article in articles"
          :key="article.name"
          v-bind="article"
        >
        </article-card>
      </div>
      <signup-card class="flex-none"></signup-card>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface PageConf extends ParsedContent {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  keywords: string[]
}

const { data: pageConfig } = await useAsyncData('pageConfig', () =>
  queryContent<PageConf>('blog/index').findOne()
)

const title = pageConfig.value ? pageConfig.value.title : ''
const description = pageConfig.value ? pageConfig.value.description : ''
const ogTitle = pageConfig.value ? pageConfig.value.og_title : ''
const ogDescription = pageConfig.value ? pageConfig.value.og_description : ''
const ogImage = pageConfig.value ? pageConfig.value.og_image : ''
const keywords = pageConfig.value ? pageConfig.value.keywords : ''

const { data: articleRecords } = await useAsyncData('articleRecords', () =>
  queryContent('articles').sort({ date: 1, desc: 1 }).find()
)
const articles =
  articleRecords && articleRecords.value ? articleRecords.value.slice() : []
const featured = articles.shift()

const { fullPath: absUrl } = useRoute()

useHead({
  bodyAttrs: {
    class: 'leading-normal tracking-normal text-white gradient',
    style: 'font-family: "Source Sans Pro", sans-serif;',
  },
  title,
  meta: [
    {
      hid: 'description',
      property: 'description',
      content: description,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: ogTitle,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: ogDescription,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: ogImage,
    },
    {
      hid: 'keywords',
      property: 'keywords',
      content: keywords,
    },
  ],
  link: [
    {
      hid: 'canonical',
      rel: 'canonical',
      href: absUrl,
    },
  ],
})
</script>
