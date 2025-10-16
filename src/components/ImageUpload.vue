<script setup lang="ts">
import Uploader from 'vue-media-upload'
import { ref } from 'vue'

interface Props {
  modelValue?: string[]
  label?: string
  maxSizeMB?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  label: 'Upload Images',
  maxSizeMB: 5
})

const emit = defineEmits(['update:modelValue'])

const media = ref(
  props.modelValue.map((url: string) => ({ name: url }))
)
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)

/**
 * Called when upload changes.
 * Extracts uploaded Supabase URLs and emits to parent.
 */
const onChanged = (files: any[]) => {
  const urls = files
    .map((f: any) => f.response?.name || f.name)
    .filter((u: string) => !!u)
  emit('update:modelValue', urls)
}

/**
 * Optional: Prevent invalid files (non-image or too large)
 */
const beforeUpload = (file: File) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    alert('Only JPG, PNG, and GIF images are allowed.')
    return false
  }
  const maxSizeBytes = props.maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    alert(`File is too large! Maximum allowed size is ${props.maxSizeMB} MB.`)
    return false
  }
  return true
}
</script>

<template>
  <div class="flex flex-col items-start w-full">
    <label class="font-semibold mb-2">{{ label }}</label>
    <Uploader
      :server="uploadUrl"
      name="image"
      accept="image/*"
      :media="media"
      @change="onChanged"
      :before-upload="beforeUpload"
    />
  </div>
</template>

<style scoped>
label {
  font-size: 1rem;
  color: #333;
}
</style>
