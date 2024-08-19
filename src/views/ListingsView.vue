<script lang="ts" setup>
import {onMounted, ref} from "vue";
import BookList from "@/components/BookList.vue";
import Pagination from "@/components/Pagination.vue";
import LanguageCheckboxes from "@/components/LanguageCheckboxes.vue";
import {getListings} from "@/API/HttpService";

type Book = {
  id: number,
  title: string,
  author: string,
}
export type Listing = {
  id: number,
  title: string,
  images: string,
  books: Array<Book>,
  price: number
}

type Meta = {
  links: string[]
}
const listings = ref<Listing[] | null>(null)
const meta = ref<Meta | null>(null)

const currentPage = ref<number | null>(null);

onMounted(async () => {
  const listingsResponse = await getListings(currentPage.value ?? 0)
  listings.value = listingsResponse.data;
  meta.value = listingsResponse.meta
})

const handlePageChanged = async (index: number) => {
  currentPage.value = index;
  const listingsResponse = await getListings(currentPage.value ?? 0)
  listings.value = listingsResponse.data;
  meta.value = listingsResponse.meta
}

const languages = [
  {
    id: 0,
    name: 'English',
  },
  {
    id: 1,
    name: 'French',
  },
]

</script>

<template>
  <LanguageCheckboxes :languages="languages"/>
  <h1 class="text-3xl text-red-900">All Listings</h1>
  <div v-if="listings">
    <div class="grid grid-cols-2 m-4 gap-4">
      <div v-for="listing in listings" :key="listing.id" class="border-blue-500 border-2 my-3 p-2">
        <p>Listing title: {{ listing.title }}</p>
        <!--        TODO: Show images-->
        <img v-if="!!listing.images" :src="`http://localhost:8000/storage/${listing.images}`" alt="image"
             class="max-w-40"/>
        <BookList :books="listing.books"/>
        <p>Price: {{ listing.price }}</p>
      </div>
    </div>
    <Pagination :links="meta?.links ?? []" @change-page="handlePageChanged"/>
  </div>

</template>

<style scoped>

</style>