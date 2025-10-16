<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'
import type { Organizer } from '@/types'

const route = useRoute()
const organizer = ref<Organizer | null>(null)

onMounted(async () => {
  const response = await OrganizerService.getOrganizer(Number(route.params.id))
  organizer.value = response.data
})
</script>

<template>
  <div v-if="organizer">
    <h2>{{ organizer.name }}</h2>
    <div class="flex flex-wrap justify-center">
      <img
        v-for="img in organizer.images"
        :key="img"
        :src="img"
        class="border rounded w-40 m-1"
      />
    </div>
  </div>
</template>
