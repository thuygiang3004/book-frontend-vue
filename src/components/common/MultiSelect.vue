<script lang="ts" setup>

import {onBeforeUnmount, onMounted, ref} from "vue";

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

const multiSelect = ref<HTMLElement | null>(null)

const selectedOption = ref(props.options.find(option => option.id === props.modelValue) ?? null)

const showDropdown = ref(false)
const setValue = (option) => {
  selectedOption.value = option
  emit('update:modelValue', option)
}

const closeDropdown = (element) => {
  if (!multiSelect.value?.contains(element.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropdown)
})

</script>

<template>
  <div ref="multiSelect" class="z-10" @click="showDropdown = !showDropdown">
      <div class="absolute bg-white px-4 min-w-52 w-max">
        <div>{{ selectedOption ? selectedOption.name : 'Please select' }}</div>
        <div v-for="option in props.options" :key="option.id" :class="showDropdown? 'block' : 'hidden'"
             @click="setValue(option)">
          {{ option.name }}
        </div>
      </div>
  </div>
</template>

<style scoped>

</style>