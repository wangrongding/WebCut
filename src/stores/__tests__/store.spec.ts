import { setActivePinia, createPinia, storeToRefs } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCounterStore } from '~/stores/counter'
import { usePlayerStore } from '~/stores/player'

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('count', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(0)
    counter.increment()
    expect(counter.count).toBe(1)
    expect(counter.doubleCount).toBe(2)
  })

  it('player', () => {
    const player = usePlayerStore()

    expect(player.playStatus).toBe(false)
    player.togglePlay()
    expect(player.playStatus).toBe(true)

    expect(player.playList).toEqual([])
    expect(player.trackCount).toBe(0)

    const { playList, trackCount } = storeToRefs(player)
    playList.value.push('song1')
    expect(player.playList).toEqual(['song1'])
    expect(trackCount.value).toBe(1)
  })
})
