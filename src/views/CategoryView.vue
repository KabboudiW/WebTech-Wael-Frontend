<template>
  <div class="category-view">
    <router-link to="/">← Back</router-link>
    <LeaderboardCategory :title="category" :players="players" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import LeaderboardCategory from '../components/LeaderboardCategory.vue'
import { Player, Leaderboard } from '../types'

export default defineComponent({
  components: { LeaderboardCategory },
  setup() {
    const route = useRoute()
    const leaderboard: Leaderboard = {
      'Best Rated': [
        { name: 'K. Mbappé', value: 9.2 },
        { name: 'E. Haaland', value: 8.9 }
      ],
      Goals: [
        { name: 'E. Haaland', value: 5 },
        { name: 'R. Lewandowski', value: 4 }
      ],
      Assists: [
        { name: 'K. De Bruyne', value: 4 },
        { name: 'B. Fernandes', value: 3 }
      ],
      'Chances Created': [
        { name: 'K. De Bruyne', value: 7 },
        { name: 'P. Foden', value: 6 }
      ],
      'Missed Chances': [
        { name: 'Darwin Núñez', value: 6 },
        { name: 'R. Lukaku', value: 5 }
      ]
    }

    const category = computed(() => route.params.name as string)
    const players = computed(() => leaderboard[category.value] || [])

    return { category, players }
  }
})
</script>

<style scoped>
.category-view {
  max-width: 500px;
  margin: 2rem auto;
  text-align: center;
}
</style>
