<script setup>
import {ref} from "vue";
import {useAuthStore} from "@/store/auth.store.ts";

const input = ref({
  email: '',
  password: ''
})

const errors = ref([])

const {login} = useAuthStore()
const handleLoginBtnClick = async () => {
  try {
    await login(input.value)

  } catch (e) {
    if (!errors.value.includes(e?.data?.message)) {
      errors.value.push(e?.data.message)
    }
  }
}

</script>

<template>
  <div class="bg-stone-700 text-white p-10 flex flex-col gap-4">
    <label>
      Email
      <input class="text-black" v-model="input.email">
    </label>
    <label>
      Password
      <input class="text-black" v-model="input.password"/>
    </label>
    <div>
      <button class="bg-blue-500 text-white px-4 py-2" type='submit' @click="handleLoginBtnClick">Log in
      </button>
    </div>
    <div v-if="errors.length">
      <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>