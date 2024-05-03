import type { fabric } from 'fabric'
import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

type ElementTypes = 'text' | 'image' | 'video' | 'svg' | 'audio'
export interface ElementItem {
  id: string
  type: ElementTypes
  element: fabric.Object
}
export type ElementList = ElementItem[]

export const usePlayerStore = defineStore('playerStore', () => {
  // 播放状态
  const playStatus = ref(false)
  // 播放列表
  const playList = ref<string[]>([])
  // 轨道数
  const trackCount = computed(() => playList.value.length)
  // 元素列表
  const elementList = ref<ElementList>([])
  // 当前时间
  const currentTime = ref<number>(0)
  // 总时长
  const duration = ref<number>(0)

  // 切换播放状态
  function togglePlay(state?: boolean) {
    playStatus.value = state === undefined ? !playStatus.value : state
  }
  // 添加元素
  function addElement(type: ElementTypes, element: fabric.Object) {
    elementList.value.push({ id: String(Date.now()), element, type })
  }
  // 删除元素
  function removeElement(id: string) {
    const index = elementList.value.findIndex((item) => item.id === id)
    if (index !== -1) elementList.value.splice(index, 1)
  }

  return {
    playStatus,
    playList,
    trackCount,
    currentTime,
    duration,
    elementList,
    togglePlay,
    addElement,
    removeElement,
  }
})

export const usePlayerStoreWithRefs = () => storeToRefs(usePlayerStore())
