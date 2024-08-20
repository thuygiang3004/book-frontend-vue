<script lang="ts" setup>

import {onBeforeUnmount, onMounted, ref} from "vue";

export type Option = {
  id: number,
  name: string
}
type MultiSelectProps = {
  options: Array<Option>,
  modelValue: Array<number> | null
}
const props = defineProps<MultiSelectProps>()

const emit = defineEmits(['update:modelValue'])

const multiSelect = ref<HTMLElement | null>(null)

const selectedOptions = ref(props.options.filter(option => props.modelValue?.includes(option.id)) ?? [])

const showDropdown = ref(false)
const setValue = (option) => {
  if (!selectedOptions.value.includes(option)) {
    selectedOptions.value.push(option)
    emit('update:modelValue', selectedOptions.value)
  }
}

const closeDropdown = (element) => {
  if (!multiSelect.value?.contains(element.target)) {
    showDropdown.value = false
  }
}

const removeOption = (option: Option) => {
  if (selectedOptions.value.includes(option)) {
    selectedOptions.value?.splice(selectedOptions.value.findIndex((item) => item.id === option.id), 1)
    emit('update:modelValue', selectedOptions.value)
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
    <div class="absolute bg-white px-2 min-w-52 w-max rounded-sm">
      <div class="flex gap-2">
        <div v-if="!selectedOptions.length">Please select books</div>
        <div v-for="selectedOption in selectedOptions"
             v-else
             :key="selectedOption.id"
             class="bg-gray-200 pl-2 my-1 flex gap-2 items-center justify-between rounded-sm"
        >
          <div>{{ selectedOption.name }}</div>
          <div class="text-md text-gray-500 px-2 cursor-pointer hover:bg-gray-300 hover:text-gray-600"
               @click="removeOption(selectedOption)">x
          </div>
        </div>
      </div>

      <div v-for="option in props.options"
           :key="option.id"
           :class="showDropdown? 'block' : 'hidden'"
           @click="setValue(option)">
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>