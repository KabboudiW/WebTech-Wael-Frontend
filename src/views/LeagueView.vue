<template>
  <div class="league-view">
    <router-link to="/">← Back</router-link>

    <h1 class="title">{{ leagueTitle }}</h1>

    <div class="mode-tabs">
      <button :class="{ active: mode === 'stats' }" @click="mode = 'stats'">Player Stats</button>
      <button :class="{ active: mode === 'results' }" @click="mode = 'results'">Match Results</button>
    </div>

    <!-- 🔍 Search direkt unter League -->
    <div v-if="mode === 'stats'" class="search-row">
      <input v-model="search" class="search" placeholder="Search player or team" />
    </div>


    <div class="controls">
      <label class="week">
        Week
        <select v-model="week" class="week-select">
          <option v-for="w in availableWeeks" :key="w" :value="w">{{ w }}</option>
        </select>

      </label>

      <div v-if="mode === 'stats'" class="metrics">
        <button :class="{ active: metric === 'rating' }" @click="metric = 'rating'">Best Rated</button>
        <button :class="{ active: metric === 'goals' }" @click="metric = 'goals'">Goals</button>
        <button :class="{ active: metric === 'assists' }" @click="metric = 'assists'">Assists</button>
        <button :class="{ active: metric === 'chances' }" @click="metric = 'chances'">Chances Created</button>
        <button :class="{ active: metric === 'missed' }" @click="metric = 'missed'">Missed Chances</button>
      </div>
    </div>


    <LeaderboardCategory
      v-if="mode === 'stats'"
      :title="`${leagueTitle} — ${metric.toUpperCase()}`"
      :metric="metric"
      :week="week"
      :league="leagueCode"
      :search="search"
    />

    <LeagueResults
      v-else
      :league="leagueCode"
      :week="week"
    />

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import LeaderboardCategory from '../components/LeaderboardCategory.vue'
import { LEAGUES } from '@/config/leagues'
import LeagueResults from '../views/LeagueResults.vue'

type Mode = 'stats' | 'results'
const mode = ref<Mode>('stats')

type Metric = 'rating' | 'goals' | 'assists' | 'chances' | 'missed'

const route = useRoute()
const leagueCode = computed(() => String(route.params.code || ''))

const leagueTitle = computed(() => {
  const found = LEAGUES.find(l => l.code === leagueCode.value)
  return found ? found.name : leagueCode.value
})

const metric = ref<Metric>('rating')
const availableWeeks = ['2026-W01', '2026-W02', '2026-W03']
const week = ref(availableWeeks[availableWeeks.length - 1])
const search = ref('')
</script>

<style scoped>
.league-view {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 16px;
}

.title {
  margin: 12px 0 8px;
}

.search-row {
  margin: 8px 0 14px;
}
.mode-tabs {
  display: flex;
  gap: 10px;
  margin: 10px 0 16px;
  flex-wrap: wrap;
}

.mode-tabs button {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}

.mode-tabs button.active {
  border-color: #111;
  font-weight: 600;
}


.search {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 300px;
  max-width: 100%;
}

.controls {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: 12px 0 16px;
}

.week {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.week-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
}


.metrics {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.metrics button {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}

.metrics button.active {
  border-color: #111;
  font-weight: 600;
}
</style>
