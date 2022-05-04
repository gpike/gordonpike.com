<template>
  <div class="grid grid-cols-6 gap-4">
    <div class="col-span-6"><header-component></header-component></div>
    <div class="col-span-4"><Nuxt /></div>
    <div class="col-span-2"><side-component></side-component></div>
    <div class="col-span-6"><footer-component></footer-component></div>
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
