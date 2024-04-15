import type { fabric } from 'fabric'
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
  const playList = ref<string[]>([])
  // 轨道数
  const trackCount = computed(() => playList.value.length)
  // 元素列表
  const elementList = ref<fabric.Object[]>([])

  const canvasRef = ref<HTMLCanvasElement | null>(null)

  const canvasFullScreen = ref(false)

  function toggleCanvasFullScreen() {
    if (canvasRef.value?.requestFullscreen) {
      canvasRef.value.requestFullscreen()
    }
  }

  const videoRef = ref<HTMLVideoElement | null>(null)

  const currentTime = ref<number>(0)

  const duration = ref<number>(0)

  function skip(seconds: number) {
    if (videoRef.value) {
      videoRef.value.currentTime += seconds
    }
  }

  return {
    playStatus,
    togglePlay,
    playList,
    trackCount,
    canvasRef,
    canvasFullScreen,
    toggleCanvasFullScreen,
    videoRef,
    skip,
    currentTime,
    duration,
    elementList
  }
})
