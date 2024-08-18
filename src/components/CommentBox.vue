<script setup>
import {ref} from "vue";
import {createComment} from "@/API/HttpService.ts";

const comment = ref('')

const addComment = async () => {
  console.log('here')
  await createComment(comment.value)
}
</script>

<template>
  <input id="comment" v-model="comment" placeholder="Leave a comment"/>
  <button type="submit" @click="addComment">Add comment</button>
</template>

<style scoped>

</style>