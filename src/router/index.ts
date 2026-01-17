// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LeagueView from '../views/LeagueView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', component: HomeView },

  // ✅ ändern: league statt category
  { path: '/league/:code', component: LeagueView },

  { path: '/about', component: AboutView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
