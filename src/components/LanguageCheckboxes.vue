<script setup>
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

defineProps({
  languages: Array
});

const selectedLanguages = ref([]);

const router = useRouter()

const route = useRoute();
// const queryParams = route.query;
// console.log(queryParams)

watch(selectedLanguages, (newValue) => {
  console.log(selectedLanguages.value)
  router.replace({query: {...route.query, languages: selectedLanguages.value.map(value => value.toString())}})
})

</script>

<template>
  <div v-for="language in languages" :key="language.id">
    <label>
      {{ language.name }}
      <input v-model="selectedLanguages"
             :value="language.id"
             type="checkbox">
    </label>
  </div>
</template>

<style scoped>

</style>