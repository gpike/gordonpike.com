<template>
  <aside>
    <signup-card />
  </aside>
</template>
<script>
import SignupCard from '~/components/SignupCard.vue'

export default {
  name: 'SideComponent',
  components: {
    SignupCard,
  },
}
</script>
