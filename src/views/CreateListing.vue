<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {getBooks, postListing} from "@/API/HttpService.ts";
import {useRouter} from "vue-router";
import Header from "@/components/Header.vue";
import MultiSelect, {Option} from "@/components/common/MultiSelect.vue";
import {Book} from "@/views/ListingsView.vue";

const bookList = ref<Book[] | null>(null);

type ListingInput = {
  title: string,
  price: number | null,
  image: string | null,
}
const listing = ref<ListingInput>({
  title: '',
  price: null,
  image: null,
})

const imageInput = ref(null)
const image = ref<Blob | null>(null)

const router = useRouter()

onMounted(async () => {
  bookList.value = (await getBooks()).data as Book []
})

const bookOptions = computed(() => {
  if (!bookList.value) {
    return []
  }
  return bookList.value?.map((book) => ({
    id: book.id,
    name: book.title,
  }))
})

const selectedBooks = ref<Array<Option> | null>(null)

const handleFileUpload = () => {
  image.value = imageInput.value?.files[0]
}
const formData = new FormData()
const handleSubmit = async () => {

  if (!listing.value || !listing.value.title || !listing.value.price) {
    console.log('Required fields missing')
    return
  }
  formData.append("title", listing.value.title)
  selectedBooks.value?.forEach((option) => {
    formData.append("books[]", option.id.toString())
  })
  formData.append("price", listing.value.price.toString())
  formData.append("status", "new")

  if (image.value) {
    formData.append("image", image.value as Blob)
  }

  try {
    await postListing(formData)
    await router.push({path: '/listings', replace: true})
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <Header/>
  <h1>Create a Listing</h1>
  <form class="bg-cyan-200 p-4 space-y-4" encType="multipart/form-data" @submit.prevent="handleSubmit">
    <div class="flex gap-2">
      <label>Title</label>
      <input v-model="listing.title"/>
    </div>

    <div class="flex gap-2">
      <p>Books</p>
      <MultiSelect v-if="bookOptions" v-model="selectedBooks" :options="bookOptions"/>
    </div>

    <div class="flex gap-2">
      <label>Price</label>
      <input v-model="listing.price" step="0.01" type="number"/>
    </div>

    <div class="flex gap-2">
      <label>Image</label>
      <input ref="imageInput" accept="image/*" type="file" @change="handleFileUpload"/>
    </div>

    <button type="submit">Submit</button>
  </form>
  <div>{{ selectedBooks }}</div>
</template>
