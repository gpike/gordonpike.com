<template>
  <footer class="text-white grid grid-cols-3">
    <div class="col">
      <h1 class="italic font-bold text-xl underline mb-2">
        {{ footerConfig.internal_links_heading }}
      </h1>
      <ul>
        <li
          v-for="item in footerConfig.internal_links"
          :key="item.name"
          :item="item"
        >
          <a :href="item.link">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="col">
      <h1 class="italic font-bold text-xl underline mb-2">
        {{ footerConfig.category_links_heading }}
      </h1>
      <ul>
        <li
          v-for="item in footerConfig.category_links"
          :key="item.name"
          :item="item"
        >
          <a :href="item.link">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="col">
      <h1 class="italic font-bold text-xl underline mb-2">
        {{ footerConfig.external_links_heading }}
      </h1>
      <ul>
        <li
          v-for="item in footerConfig.external_links"
          :key="item.name"
          :item="item"
        >
          <a :href="item.link">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="mt-4 col-span-full text-center font-extralight italic">
      Copywrite {{ footerConfig.copywrite }}
    </div>
  </footer>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FooterComponent',
  data() {
    return {
      footerConfig: {},
    }
  },
  async fetch() {
    this.footerConfig = await this.$content('components/Footer').fetch()
  },
  fetchOnServer: true,
})
</script>
<style lang="sass" scoped></style>
