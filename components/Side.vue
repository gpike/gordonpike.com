<template>
  <aside>
    <about-card />
  </aside>
</template>
<script>
import AboutCard from '~/components/AboutCard.vue'

export default {
  name: 'SideComponent',
  components: {
    AboutCard,
  },
}
</script>
