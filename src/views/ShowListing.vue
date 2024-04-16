<template>
  <h1 class="text-2xl">Show a listing</h1>
  <div v-if="listing">
    <p>Title: {{ listing.title }}</p>
    <p>Price: {{ listing.price }}</p>
    <BookList :books="listing.books"/>
    <div>
      <p>Comments:</p>
      <p v-for="comment in listing.comments" :key="comment.id" class="m-2 text-xs border border-cyan-950">
        {{ comment.content }}</p>
    </div>
  </div>

</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getListingInfo} from "@/API/HttpService.js";
import BookList from "@/components/BookList.vue";

const route = useRoute()
const listing = ref(null)

onMounted(async () => {
  const response = await getListingInfo(route.params.id)
  console.log(response)
  listing.value = response
})

</script>
