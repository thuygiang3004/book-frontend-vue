<script setup>
import {onMounted, ref} from "vue";
import BookList from "@/components/BookList.vue";
import Pagination from "@/components/Pagination.vue";
import {getListings} from "@/API/HttpService.js";
import LanguageCheckboxes from "@/components/LanguageCheckboxes.vue";

const listings = ref(null)
const meta = ref(null)

const currentPage = ref(null);

onMounted(async () => {
  const listingsResponse = await getListings(currentPage.value)
  listings.value = listingsResponse.data;
  meta.value = listingsResponse.meta
})

const handlePageChanged = async (index) => {
  currentPage.value = index;
  const listingsResponse = await getListings(currentPage.value)
  listings.value = listingsResponse.data;
  meta.value = listingsResponse.meta
}

const languages = [
  {
    id: 0,
    name: 'English'
  },
  {
    id: 1,
    name: 'French'
  }
]

</script>

<template>
  <LanguageCheckboxes :languages="languages"/>
  <h1 class="text-3xl text-red-900">All Listings</h1>
  <div v-if="listings">
    <div class="grid grid-cols-2 m-4 gap-4">
      <div v-for="listing in listings" :key="listing.id" class="border-blue-500 border-2 my-3 p-2">
        <p>Listing title: {{ listing.title }}</p>
        <img v-if="!!listing.images" :src="`http://localhost:8000/storage/${listing.images}`" alt="image"
             class="max-w-40"/>
        <BookList :books="listing.books"/>
        <p>Price: {{ listing.price }}</p>
      </div>
    </div>
    <Pagination :links="meta.links" @change-page="handlePageChanged"/>
  </div>

</template>

<style scoped>

</style>