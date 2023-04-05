<template>
  <div class="card bg-base-100 shadow-xl text-black">
    <figure>
      <img
        :class="data.featured ? 'h-128 w-full' : 'h-64 w-full'"
        :src="data.cover_image"
        :alt="data.cover_caption"
      />
    </figure>
    <div class="card-body font-extralight">
      <p>{{ formatDate(data.date) }}</p>
      <h2 class="card-title">
        {{ data.title }}
        <div v-if="data.badge" class="badge badge-secondary">
          {{ data.badge }}
        </div>
      </h2>
      <p v-if="data.description">{{ data.description }}</p>
      <div v-if="data.tags" class="card-actions justify-end">
        <div v-for="tag in data.tags" :key="tag" class="badge badge-outline">
          {{ tag }}
        </div>
      </div>
      <div class="pt-2 flex flex-row justify-between">
        <div class="flex flex-col justify-center">
          <div class="avatar">
            <div
              class="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <img :src="data.author_image" />
            </div>
          </div>
          <p class="font-thin text-xs pt-2">{{ data.author }}</p>
        </div>
        <NuxtLink :to="slashEnding(data._path)" class="btn btn-primary"
          >Read More</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const data = defineProps<{
  cover_image: string
  cover_caption: string
  title?: string
  description?: string
  badge?: string
  tags?: string[]
  author: string
  author_image: string
  slug: string
  _path: string
  date: string
  featured: boolean
}>()

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function slashEnding(url: string) {
  return url.endsWith('/') ? url : url.concat('/')
}
</script>
