<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  league: string
  week: string
}>()

type Match = {
  id: number
  utcDate: string
  status: string
  matchday?: number
  homeTeam: { name: string }
  awayTeam: { name: string }
  score?: {
    fullTime?: { home: number | null; away: number | null }
  }
}

const loading = ref(false)
const error = ref<string | null>(null)
const matches = ref<Match[]>([])

function formatDate(utcDate: string) {
  // simple formatting; browser locale
  const d = new Date(utcDate)
  return d.toLocaleString()
}

function scoreText(m: Match) {
  const ft = m.score?.fullTime
  if (!ft) return '—'
  const h = ft.home ?? '—'
  const a = ft.away ?? '—'
  return `${h} : ${a}`
}

async function loadResults() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  if (!baseUrl) {
    error.value = 'VITE_BACKEND_BASE_URL is not defined!'
    return
  }

  loading.value = true
  error.value = null

  try {
    const url = new URL(`${baseUrl}/api/external/matches`)
    url.searchParams.set('league', props.league)
    url.searchParams.set('week', props.week || 'CURRENT')

    const res = await fetch(url.toString())
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`)

    const json = await res.json()
    // football-data returns { matches: [...] }
    matches.value = (json.matches ?? []) as Match[]
  } catch (e: any) {
    error.value = e?.message ?? String(e)
    matches.value = []
  } finally {
    loading.value = false
  }
}

watch(() => [props.league, props.week], loadResults, { immediate: true })
</script>

<template>
  <div class="results">
    <h2>Match Results</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="!matches.length" class="empty">No matches found for this week.</div>

    <ul v-else class="list">
      <li v-for="m in matches" :key="m.id" class="item">
        <div class="meta">
          <span class="date">{{ formatDate(m.utcDate) }}</span>
          <span class="status">{{ m.status }}</span>
        </div>

        <div class="row">
          <span class="team">{{ m.homeTeam.name }}</span>
          <span class="score">{{ scoreText(m) }}</span>
          <span class="team">{{ m.awayTeam.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.results {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 900px;
  margin: 0 auto;
}
.error {
  color: red;
  font-weight: bold;
}
.empty {
  color: #555;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}
.meta {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 6px;
}
.row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: center;
}
.team {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.score {
  font-weight: 700;
  padding: 4px 10px;
  border: 1px solid #ddd;
  border-radius: 999px;
}
</style>
