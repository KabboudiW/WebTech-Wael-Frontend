import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HomeView from '../../views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: { template: '<div>About</div>' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('HomeView.vue', () => {
  it('renders all categories', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router]
      }
    })
    const categories = ['Best Rated', 'Goals', 'Assists', 'Chances Created', 'Missed Chances']
    categories.forEach(cat => {
      expect(wrapper.text()).toContain(cat)
    })
  })

  it('renders About link', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(HomeView, {
      global: { plugins: [router] }
    })
    expect(wrapper.text()).toContain('About this App')
  })
})
