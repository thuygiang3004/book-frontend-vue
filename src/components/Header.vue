<script setup>

import {useAuthStore} from "@/store/auth.store.ts";
import {storeToRefs} from "pinia";

const authStore = useAuthStore()
const {isAuthenticated, userName} = storeToRefs(authStore)

const handleLogout = async () => {
  await authStore.logout()
}

</script>

<template>
  <div v-if="isAuthenticated" class="bg-gray-500 text-white flex justify-end p-2 gap-6">
    <p>Hello, {{ userName }}</p>
    <button class="hover:text-cyan-200" @click="handleLogout">Log out</button>
  </div>
</template>

<style scoped>

</style>