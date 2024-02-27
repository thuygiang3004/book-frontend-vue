<script setup>
import {computed, defineProps} from 'vue';

const props = defineProps({
  links: {
    type: Array,
    default: () => []
  }
})

const computedLinks = computed(() => {
  return props.links.filter(link => !isNaN(link.label))
})
</script>

<template>
  <div class="flex justify-center items-center gap-2">
    <button v-for="(link) in computedLinks" :key="link.label" @click.prevent="$emit('change-page', link.label)">
      {{ link.label }}
    </button>
  </div>
</template>

<style scoped>

</style>