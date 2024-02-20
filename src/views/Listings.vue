<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const listings = ref(null)
onMounted(async ()=>{
  listings.value = (await getListings()).data;
  console.log(listings.value);
})

const getListings = async (currentPage = 1) => {
  const res = await axios.get(`http://127.0.0.1:8000/api/listings?page=${currentPage}`);
  return res.data
}

</script>

<template>
  <h1 class="text-6xl text-red-900">All Listings</h1>
  <div>
    <div v-for="listing in listings" :key="listing.id">
      <p>Listing title: {{ listing.title }}</p>
      <img v-if="!!listing.images" :src="`http://localhost:8000/storage/${listing.images}`" alt="image"/>
<!--      <BookLists books={listing.books}/>-->
        <p>Price: {{ listing.price }}</p>
    </div>
  </div>

</template>

<style scoped>

</style>