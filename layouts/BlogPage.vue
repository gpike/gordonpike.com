<template>
  <div
    class="
      mx-4
      md:mx-6
      lg:mx-8
      grid grid-cols-4
      md:grid-cols-8
      lg:grid-cols-12
      gap-4
      md:gap-6
      lg:gap-8
    "
  >
    <div class="col-span-full"><header-component></header-component></div>
    <div class="col-span-full md:col-span-6 lg:col-span-8"><Nuxt /></div>
    <div class="col-span-full md:col-span-2 lg:col-span-4">
      <side-component></side-component>
    </div>
    <div class="col-span-full"><footer-component></footer-component></div>
  </div>
</template>
<script>
import HeaderComponent from '../components/Header.vue'
import FooterComponent from '../components/Footer.vue'
import SideComponent from '../components/Side.vue'
export default {
  components: {
    'header-component': HeaderComponent,
    'footer-component': FooterComponent,
    'side-component': SideComponent,
  },
}
</script>
