import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePlayerStore = defineStore('playerStore', () => {
  // 播放状态
  const playStatus = ref(false)
  // 切换播放状态
  function togglePlay(state?: boolean) {
    playStatus.value = state === undefined ? !playStatus.value : state
  }
  // 播放列表
  const playList = ref([])
  // 轨道数
  const trackCount = computed(() => playList.value.length)

  return { playStatus, togglePlay, playList, trackCount }
})
