<script lang="ts" setup>

import {ref} from "vue";

export type Option = {
  id: number,
  name: string
}
type MultiSelectProps = {
  options: Array<Option>,
  modelValue: number | null
}
const props = defineProps<MultiSelectProps>()

const emit = defineEmits(['update:modelValue'])

const selectedOption = ref(props.options.find(option => option.id === props.modelValue) ?? null)

const showBooks = ref(false)
const setValue = (option) => {
  selectedOption.value = option
  emit('update:modelValue', option)
}

// TODO: Close dropdown when click outside

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