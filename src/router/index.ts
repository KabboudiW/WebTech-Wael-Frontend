import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/category/:name', component: CategoryView },
  { path: '/about', component: AboutView }   // new About route
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
