<template>
  <section
    class="
      container
      grid grid-cols-1
      md:grid-cols-6
      lg:grid-cols-8
      md:gap-2
      lg:gap-4
    "
  >
    <lead-article-card class="col-span-full" :article="featured" />
    <article-card
      v-for="article in articles"
      :key="article.name"
      class="col-span-full md:col-span-3 lg:col-span-4"
      :article="article"
    >
    </article-card>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ArticleCard from '~/components/ArticleCard.vue'
import LeadArticleCard from '~/components/LeadArticleCard.vue'

export default Vue.extend({
  name: 'BlogHomePage',
  components: {
    ArticleCard,
    LeadArticleCard,
  },
  layout: 'BlogPage',
  async asyncData({ $content }) {
    const pageConfig = await $content('blog/index').fetch()
    const articleRecords = await $content('articles')
      .sortBy('date', 'desc')
      .fetch()
    const articles = articleRecords.slice()

    return {
      pageConfig,
      featured: articles.shift(),
      articles,
    }
  },
  data() {
    return {
      absUrl: '',
    }
  },
  head() {
    return {
      title: (this as any).pageConfig.title,
      meta: [
        {
          hid: 'description',
          property: 'description',
          content: (this as any).pageConfig.description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: (this as any).pageConfig.og_title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: (this as any).pageConfig.og_description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: (this as any).pageConfig.og_image,
        },
        {
          hid: 'keywords',
          property: 'keywords',
          content: (this as any).pageConfig.keywords,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: (this as any).absUrl,
        },
      ],
    }
  },
  beforeMount() {
    this.absUrl = `${window.location.origin}${this.$route.fullPath}`
  },
})
</script>
