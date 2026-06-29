<template>
  <NuxtLayout name="default">
    <section class="container mx-auto bg-white">
      <nuxt-content
        class="col-span-full article-body px-8 font-body font-thin text-lg leading-loose prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
        :document="about"
      />
    </section>
  </NuxtLayout>
</template>

<script>
export default {
  name: 'AboutPage',
  layout: 'BlogDetail',
  async asyncData({ $content }) {
    // console.info(params.slug)
    const about = await $content('about').fetch()
    return {
      about,
    }
  },
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
