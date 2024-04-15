<script setup>
import {ref} from "vue";
import {login} from "@/API/HttpService.js";
import {useRouter} from "vue-router";

const input = ref({
  email: '',
  password: ''
})

const errors = ref([]);

const router = useRouter()
const handleLoginBtnClick = async () => {
  try {
    const user = await login(input.value)

    localStorage.setItem('userName', user.userName)
    localStorage.setItem('userEmail', user.userEmail)
    localStorage.setItem('token', user.token)

    await router.push({path: '/listings', replace: true})
  }catch (e){
    if(!errors.value.includes(e.data.message)) {
      errors.value.push(e.data.message)
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
      <p v-for="(error, index) in errors" :key="index" >{{error}}</p>
    </div>
  </div>
</template>

<style scoped>

</style>