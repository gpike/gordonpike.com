<template>
  <section class="container mx-auto bg-white">
    <article-detail v-bind:article="article" class="col-span-3" />
    <commentics-comments></commentics-comments>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ArticleDetail from '~/components/ArticleDetail.vue'
import CommenticsComments from '~/components/CommenticsComments.vue'

export default Vue.extend({
  components: {
    ArticleDetail,
    CommenticsComments,
  },
  layout: 'BlogDetail',
  async asyncData({ $content, params }) {
    // console.info(params.slug)
    const article = await $content('articles', params.slug).fetch()
    return {
      article,
    }
  },
  data() {
    return {
      absUrl: '',
    }
  },

  head() {
    return {
      title: (this as any).article.title,
      meta: [
        {
          hid: 'description',
          property: 'description',
          content: (this as any).article.description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: (this as any).article.og_title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: (this as any).article.og_description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: (this as any).article.og_image,
        },
        {
          hid: 'keywords',
          property: 'keywords',
          content: (this as any).article.keywords,
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          hid: 'comentics-script',
          src: 'https://gordonpike.com/comments/embed.js',
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
    ;(this as any).absUrl = `${window.location.origin}${this.$route.fullPath}`
  },
})
</script>

<style lang="scss" scoped>
.dummy {
  display: block;
}
</style>
