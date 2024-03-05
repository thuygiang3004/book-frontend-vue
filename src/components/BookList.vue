<script setup>
const props = defineProps({
  books: []
})
</script>

<template>
  <div>
    <p>Book: </p>
    <ul class="ml-4 list-disc text-gray-500 text-sm">
      <li v-for="book in props.books" :key="book.id">
        {{ book.title }}
      </li>
    </ul>
  </div>

</template>

<style scoped>

</style>