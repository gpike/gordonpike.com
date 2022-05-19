<template>
  <div class="bg-background">
    <div
      class="
        grid grid-cols-4
        md:grid-cols-8
        lg:grid-cols-12
        gap-4
        md:gap-6
        lg:gap-8
      "
    >
      <div class="col-span-full bg-header p-4 md:p-6 lg:p-8">
        <header-component></header-component>
      </div>
      <div
        class="col-span-full md:col-span-6 lg:col-span-8 px-4 md:px-6 lg:px-8"
      >
        <Nuxt />
      </div>
      <div class="col-span-full md:col-span-2 lg:col-span-4">
        <side-component></side-component>
      </div>
      <div class="col-span-full bg-footer p-4 md:p-6 lg:p-8">
        <footer-component></footer-component>
      </div>
    </div>
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
