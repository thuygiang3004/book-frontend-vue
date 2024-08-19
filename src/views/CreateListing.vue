<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {getBooks, postListing} from "@/API/HttpService.ts";
import {useRouter} from "vue-router";
import Header from "@/components/Header.vue";

const bookList = ref(null);

type ListingInput = {
  title: string,
  price: number | null,
  image: string | null,
  bookId: string
}
const listing = ref<ListingInput>({
  title: '',
  price: null,
  image: null,
  bookId: '',
})

const imageInput = ref(null)
const image = ref<Blob | null>(null)

const router = useRouter()

onMounted(async () => {
  bookList.value = (await getBooks()).data
})

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
  formData.append("books[]", listing.value.bookId.toString())
  formData.append("price", listing.value.price.toString())
  formData.append("status", "new")

  if (image.value) {
    formData.append("image", image.value)
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
    <div>
      <label>Title</label>
      <input v-model="listing.title"/>
    </div>

    <div>
      <label>Book Name</label>
      <select v-model="listing.bookId">
        <option value="">Select a book</option>
        <option v-for="book in bookList" :key="book.id" :value="book.id">
          {{ book.title }}
        </option>
        ))}
      </select>
    </div>

    <div>
      <label>Price</label>
      <input v-model="listing.price" step="0.01" type="number"/>
    </div>

    <div>
      <label>Image</label>
      <input ref="imageInput" accept="image/*" type="file" @change="handleFileUpload"/>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
