<script setup>

import {useAuthStore} from "@/store/auth.store.js";
import {storeToRefs} from "pinia";

const authStore = useAuthStore()
const {isAuthenticated} = storeToRefs(authStore)

const handleLogout = async () => {
  await authStore.logout()
}

</script>

<template>
  <div class="bg-gray-900 text-white">
    <button v-if="isAuthenticated" @click="handleLogout">Log out</button>
  </div>
</template>

<style scoped>

</style>