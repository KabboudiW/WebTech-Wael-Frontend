<template>
  <div class="container home">
    <h1>Weekly Football Leaderboard</h1>

    <h2>Leagues</h2>

    <div class="league-grid">
      <router-link
        v-for="l in leagues"
        :key="l.code"
        :to="`/league/${l.code}`"
        class="league-card"
      >
        <img :src="l.logo" :alt="l.name" class="league-logo" />
        <div class="league-name">{{ l.name }}</div>
      </router-link>
    </div>

    <h2>About</h2>
    <div class="card">
      <router-link to="/about" class="button-card">About this App</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LEAGUES as leagues } from "@/config/leagues"
</script>

<style scoped>
.league-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-bottom: 24px;
}

.league-card {
  display: block;
  border: 1px solid #ddd;
  border-radius: 14px;
  padding: 14px;
  background: #fff;
  text-decoration: none;
  color: inherit;
}

.league-logo {
  width: 100%;
  height: 110px;
  object-fit: contain;
}

.league-name {
  margin-top: 10px;
  font-weight: 600;
}
</style>
