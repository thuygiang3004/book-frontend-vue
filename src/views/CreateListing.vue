<template>
  <h1>Create a Listing</h1>
  <form @submit.prevent="handleSubmit" encType="multipart/form-data" class="bg-cyan-200 p-4 space-y-4">
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
      <input v-model="listing.price" type="number" step="0.01"/>
    </div>

    <div>
      <label>Image</label>
      <input ref="imageInput" @change="handleFileUpload" type="file" accept="image/*"/>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {getBooks, postListing} from "@/API/HttpService.js";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/store/auth.store.js";

const bookList = ref(null);
const authStore = useAuthStore()
const {isAuthenticated} = storeToRefs(authStore)

const listing = ref({
  title: '',
  price: null,
  image: null,
  bookId: ''
})

const imageInput = ref(null)
const image = ref(null)

const router = useRouter()

onMounted(async () => {

  console.log(isAuthenticated.value)
  if (!isAuthenticated.value) {
    router.push({path: '/login', replace: true})
  }
  bookList.value = await getBooks();
})

const handleFileUpload = () => {
  image.value = imageInput.value?.files[0];
}

const formData = new FormData()
const handleSubmit = async () => {
  if (image.value) formData.append("image", image.value);
  formData.append("title", listing.value.title);
  formData.append("books[]", listing.value.bookId.toString());
  formData.append("price", listing.value.price.toString());
  formData.append("status", "new");

  try {
    await postListing(formData)
    await router.push({path: '/listings', replace: true})
  } catch (e) {
    console.log(e)
  }
}


</script>