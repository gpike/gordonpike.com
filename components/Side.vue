<template>
  <aside>
    <signup-card />
    <about-card />
  </aside>
</template>
<script>
import AboutCard from '~/components/AboutCard.vue'
import SignupCard from '~/components/SignupCard.vue'

export default {
  name: 'SideComponent',
  components: {
    AboutCard,
    SignupCard,
  },
}
</script>
