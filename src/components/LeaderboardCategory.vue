<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// Props
interface Player {
  id: number
  name: string
  team: string
  rating?: number
  goals?: number
  assists?: number
  chancesCreated?: number
  missedChances?: number
}

const props = defineProps<{
  title: string
  metric?: 'rating' | 'goals' | 'assists' | 'chances' | 'missed'
}>()

const items = ref<Player[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function loadTops(metric = props.metric || 'rating') {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = `${baseUrl}/api/weekly/top?metric=${metric}`

  loading.value = true
  error.value = null

  try {
    const response = await fetch(endpoint)
    if (!response.ok) throw new Error('Network response was not ok')
    const result = await response.json()
    items.value = result.rows
  } catch (err: any) {
    console.error('Error fetching tops:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Load on mount
onMounted(() => loadTops())

// Watch for metric changes
watch(() => props.metric, (newMetric) => {
  if (newMetric) loadTops(newMetric)
})
</script>

<template>
  <div class="leaderboard-category">
    <h2>{{ props.title }}</h2>

    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <ul v-if="!loading && !error">
      <li v-for="player in items" :key="player.id">
        <strong>{{ player.name }}</strong> - {{ player.team }} -
        <span v-if="props.metric === 'rating'">{{ player.rating }}</span>
        <span v-else-if="props.metric === 'goals'">{{ player.goals }}</span>
        <span v-else-if="props.metric === 'assists'">{{ player.assists }}</span>
        <span v-else-if="props.metric === 'chances'">{{ player.chancesCreated }}</span>
        <span v-else-if="props.metric === 'missed'">{{ player.missedChances }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.leaderboard-category {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  margin: 1rem auto;
}

.error {
  color: red;
}
</style>
