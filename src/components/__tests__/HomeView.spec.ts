import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { describe, it, expect } from 'vitest'

describe('HomeView.vue', () => {
  function makeRouter() {
    // minimal router so <router-link> resolves without warnings
    return createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: HomeView },
        { path: '/league/:code', component: { template: '<div />' } },
        { path: '/about', component: { template: '<div />' } }
      ]
    })
  }

  it('renders all leagues', async () => {
    const router = makeRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(HomeView, {
      global: { plugins: [router] }
    })

    const leagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1']
    leagues.forEach(name => {
      expect(wrapper.text()).toContain(name)
    })
  })

  it('renders About link', async () => {
    const router = makeRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(HomeView, {
      global: { plugins: [router] }
    })

    expect(wrapper.text()).toContain('About this App')
  })
})
