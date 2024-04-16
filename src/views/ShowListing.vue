<template>
  <h1 class="text-2xl">Show a listing</h1>
  <div v-if="listing">
    <p>Title: {{ listing.title }}</p>
    <p>Price: {{ listing.price }}</p>
    <BookList :books="listing.books"/>
    <div>
      <p>Comments:</p>
      <div v-for="comment in listing.comments" :key="comment.id" class="m-2 text-xs border border-cyan-950">
        <p>{{ comment.content }}</p>
        <p class="italic text-right">By {{ getShortName(comment.user.name) }}</p>
      </div>
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

const getShortName = (name) => name.split(' ').map(word => word.substring(0, 1)).join('')
</script>
