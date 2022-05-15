<template>
  <div class="flex flex-row">
    <header class="basis-2/3">
      <a class="flex flex-row" href="/">
        <img class="w-24 px-4" :src="headerConfig.logo" />
        <h1 class="px-4 text-white text-3xl">{{ headerConfig.title }}</h1>
      </a>
    </header>

    <nav
      id="example-navbar-warning"
      class="basis-1/3 lg:flex flex-grow items-start"
    >
      <ul class="flex flex-col lg:flex-row list-none ml-auto">
        <li
          v-for="item in headerConfig.navigation"
          :key="item.name"
          :item="item"
          class="nav-item"
        >
          <a
            class="
              px-3
              py-2
              flex
              items-center
              text-lg
              uppercase
              font-bold
              leading-snug
              text-white
              hover:opacity-75
            "
            :href="item.link"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HeaderComponent',
  data() {
    return {
      headerConfig: {},
    }
  },
  async fetch() {
    this.headerConfig = await this.$content('components/Header').fetch()
  },
  computed: {
    cssVars() {
      return {
        '--url': `url(${(this as any).headerConfig.logo})`,
      }
    },
  },
  fetchOnServer: true,
})
</script>
<style lang="sass" scoped>
.icon
  background-color: #2AA4BF
  -webkit-mask-image: var(--url)
  mask-image: var(--url)
</style>
