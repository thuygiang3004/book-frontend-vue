<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import BookList from "@/components/BookList.vue";
import Pagination from "@/components/Pagination.vue";

const listings = ref(null)
const meta = ref(null)

const currentPage = ref(null);

onMounted(async ()=>{
  const listingsResponse = await getListings(currentPage.value)
  listings.value = listingsResponse.data;
  meta.value = listingsResponse.meta
})

const getListings = async (page) => {
  const res = await axios.get(`http://127.0.0.1:8000/api/listings?page=${page}`);
  return res.data
}

const handlePageChanged = async (index) => {
  currentPage.value = index;
  const listingsResponse = await getListings(currentPage.value)
  listings.value = listingsResponse.data;
  meta.value = listingsResponse.meta
}

</script>

<template>
  <h1 class="text-6xl text-red-900">All Listings</h1>
  <div v-if="listings">
    <div v-for="listing in listings" :key="listing.id" class="border-blue-500 border-2 my-3 p-2">
      <p>Listing title: {{ listing.title }}</p>
      <img v-if="!!listing.images" :src="`http://localhost:8000/storage/${listing.images}`" alt="image"/>
      <BookList :books="listing.books"/>
        <p>Price: {{ listing.price }}</p>
    </div>
  <Pagination :links="meta.links" @change-page="handlePageChanged"/>
  </div>

</template>

<style scoped>

</style>