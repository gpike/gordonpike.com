<template>
  <div class="navbar bg-secondary">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl mb-4" href="/">
        <div class="flex flex-row items-center">
          <img src="/images/gplogo.svg" class="h-16" alt="Gordon Pike" />
          <span class="mx-4 text-3xl">{{ data.title }}</span>
        </div>
      </a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li v-for="item in data.navigation" :key="item.name">
          <a :href="item.link">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('main-header', () =>
  queryContent('/_components/mainheader').findOne()
)
</script>
