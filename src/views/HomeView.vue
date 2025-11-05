<template>
  <div class="container home">
    <h1>Weekly Football Leaderboard</h1>

    <h2>Categories</h2>
    <div v-for="cat in categories" :key="cat" class="card">
      <router-link :to="`/category/${cat}`" class="button-card">
        {{ cat }}
      </router-link>
    </div>

    <h2>About</h2>
    <div class="card">
      <router-link to="/about" class="button-card">About this App</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const categories = ref([
      'Best Rated',
      'Goals',
      'Assists',
      'Chances Created',
      'Missed Chances'
    ])
    return { categories }
  }
})
</script>
