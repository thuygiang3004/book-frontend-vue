<script lang="ts" setup>

export type Option = {
  id: number,
  name: string
}
type MultiSelectProps = {
  options: Array<Option>,
  selected?: number
}
const props = defineProps<MultiSelectProps>()

</script>

<template>
  <div>
    <div>Select books</div>
    <div v-for="option in props.options" :key="option.id">{{ option.name }}</div>
  </div>
</template>

<style scoped>

</style>