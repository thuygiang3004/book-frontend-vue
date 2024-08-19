<script lang="ts" setup>

import {ref} from "vue";

export type Option = {
  id: number,
  name: string
}
type MultiSelectProps = {
  options: Array<Option>,
  selected?: Option
}
const props = defineProps<MultiSelectProps>()

const selectedOption = ref(props.selected ?? null)

const showBooks = ref(false)
const setValue = (option) => {
  selectedOption.value = option
}

</script>

<template>
  <div class="flex flex-row gap-2">
    <div>Books</div>
    <div class="z-10" @click="showBooks = !showBooks">
      <div class="absolute bg-white px-4 min-w-52 w-max">
        <div>{{ selectedOption ? selectedOption.name : 'Please select' }}</div>
        <div v-for="option in props.options" :key="option.id" :class="showBooks? 'block' : 'hidden'"
             @click="setValue(option)">
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>