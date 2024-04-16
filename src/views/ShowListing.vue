<template>
  Show a listing
  <div v-if="listing">
    <p>{{ listing.title }}</p>
    <p>{{ listing.price }}</p>
    <BookList :books="listing.books"/>
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
