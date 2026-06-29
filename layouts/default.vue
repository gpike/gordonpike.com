<template>
  <ContentRenderer :value="data">
    <!-- Google Tag Manager (noscript) -->
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-NSN3GXB"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe
    ></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div class="bg-background">
      <main-header></main-header>
      <slot></slot>
      <main-footer></main-footer>
    </div>
  </ContentRenderer>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('page-data', () =>
  queryContent('/').findOne()
)

useHead({
  bodyAttrs: {
    class: 'leading-normal tracking-normal text-white gradient',
    style: 'font-family: "Source Sans Pro", sans-serif;',
  },
})
</script>
