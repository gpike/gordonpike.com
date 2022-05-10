<template>
  <h1 class="">Hello</h1>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  layout: 'blog',
  async asyncData({ $content }) {
    const pageConfig = await $content('index').fetch()

    return {
      pageConfig,
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
