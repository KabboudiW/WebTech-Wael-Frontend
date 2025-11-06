<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// Define Player type matching backend JSON
interface Player {
  playerId: number
  playerName: string
  team: string
  value: number
}

// Props
const props = defineProps<{
  title: string
  metric?: 'rating' | 'goals' | 'assists' | 'chances' | 'missed'
}>()

// Reactive state
const items = ref<Player[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Fetch leaderboard from backend
async function loadTops(metric = props.metric || 'rating') {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  if (!baseUrl) {
    error.value = 'VITE_BACKEND_BASE_URL is not defined!'
    return
  }

  const endpoint = `${baseUrl}/api/weekly/top?metric=${metric}`

  loading.value = true
  error.value = null

  try {
    const response = await fetch(endpoint)
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`HTTP ${response.status}: ${text}`)
    }

    const result = await response.json()
    // Assign rows from backend (ensure type safety)
    items.value = result.rows as Player[]
  } catch (err) {
    console.error('Fetch error:', err)
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = String(err)
    }
  } finally {
    loading.value = false
  }
}


// Load leaderboard on mount
onMounted(() => loadTops())

// Reload leaderboard if metric changes
watch(() => props.metric, (newMetric) => {
  if (newMetric) loadTops(newMetric)
})
</script>

<template>
  <div class="leaderboard-category">
    <h2>{{ props.title }}</h2>

    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <ul v-if="!loading && !error && items.length">
      <li v-for="player in items" :key="player.playerId">
        <strong>{{ player.playerName }}</strong> - {{ player.team }} -
        {{ player.value }}
        <span v-if="props.metric === 'rating'">rating</span>
        <span v-else-if="props.metric === 'goals'">goals</span>
        <span v-else-if="props.metric === 'assists'">assists</span>
        <span v-else-if="props.metric === 'chances'">chances created</span>
        <span v-else-if="props.metric === 'missed'">missed chances</span>
      </li>
    </ul>

    <div v-if="!loading && !error && !items.length">No data available for this metric.</div>
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
  font-weight: bold;
}
</style>
