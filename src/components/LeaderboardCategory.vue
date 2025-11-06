<template>
  <div class="category">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="(player, i) in items" :key="i">
        {{ i + 1 }}. {{ player.name }} – {{ player.value }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue'

interface Player {
  name: string
  value: number
}

export default defineComponent({
  name: 'LeaderboardCategory',
  props: {
    title: { type: String, required: true },
    metric: { type: String, default: 'rating' }
  },
  setup(props) {
    const items = ref<Player[]>([])

    async function loadTops(metric = props.metric) {
      const baseUrl = process.env.VITE_BACKEND_BASE_URL
      const endpoint = `${baseUrl}/top?metric=${metric}`

      try {
        const response = await fetch(endpoint)
        const result = await response.json()
        console.log('Weekly top response:', result)
        items.value = result.rows // because backend returns { week, metric, rows }
      } catch (error) {
        console.error('Error fetching tops:', error)
      }
    }

    onMounted(() => {
      loadTops()
    })

    return { items }
  }
})
</script>

<style scoped>
.category {
  background-color: #fff;
  padding: 1.5rem;
  margin: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.category h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.category ul {
  list-style: none;
  padding: 0;
}

.category li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.category li:last-child {
  border-bottom: none;
}
</style>
