<template>
  <NuxtLayout name="default">
    <section>
      <article class="w-3/4 bg-white">
        <img class="w-full" :src="page.cover_image" />
        <div class="p-12">
          <h1 class="text-3xl text-black my-4">{{ page.title }}</h1>
          <div class="flex flex-row justify-between mx-16 mv-8 text-black">
            <div class="flex flex-col justify-center">
              <div class="avatar">
                <div
                  class="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                >
                  <img :src="page.author_image" />
                </div>
              </div>
              <div class="font-thin text-xs pt-2">
                {{ page.author }}
              </div>
            </div>
            <div>{{ formatDate(page.date) }}</div>
          </div>
          <div class="prose">
            <ContentRenderer :key="page._id" :value="page" />
          </div>
        </div>
      </article>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { page } = await useContent()

useHead({
  title: page.value.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: page.value.description,
    },
  ],
})

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
