import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LeaderboardCategory from '../LeaderboardCategory.vue'

describe('LeaderboardCategory.vue', () => {
  const players = [
    { name: 'K. Mbappé', value: 9.2 },
    { name: 'E. Haaland', value: 8.9 }
  ]

  it('renders the title', () => {
    const wrapper = mount(LeaderboardCategory, {
      props: {
        title: 'Best Rated',
        players
      }
    })
    expect(wrapper.text()).toContain('Best Rated')
  })

  it('renders the correct number of players', () => {
    const wrapper = mount(LeaderboardCategory, {
      props: {
        title: 'Best Rated',
        players
      }
    })
    const listItems = wrapper.findAll('li')
    expect(listItems.length).toBe(players.length)
  })

  it('displays player names and values correctly', () => {
    const wrapper = mount(LeaderboardCategory, {
      props: {
        title: 'Best Rated',
        players
      }
    })
    const listItems = wrapper.findAll('li')
    expect(listItems[0].text()).toContain('K. Mbappé')
    expect(listItems[0].text()).toContain('9.2')
    expect(listItems[1].text()).toContain('E. Haaland')
    expect(listItems[1].text()).toContain('8.9')
  })
})
