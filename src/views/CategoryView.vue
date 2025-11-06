<template>
  <div class="category-view">
    <router-link to="/">← Back</router-link>
    <LeaderboardCategory :title="category" :metric="metric" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import LeaderboardCategory from '../components/LeaderboardCategory.vue'

export default defineComponent({
  components: { LeaderboardCategory },
  setup() {
    const route = useRoute()
    const category = computed(() => route.params.name as string)

    // Map human-readable category to backend metric
    const metricMap: Record<string, string> = {
      "Best Rated": "rating",
      "Goals": "goals",
      "Assists": "assists",
      "Chances Created": "chances",
      "Missed Chances": "missed"
    }

    const metric = computed(() => metricMap[category.value] || "rating")

    return { category, metric }
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
