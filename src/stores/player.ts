import type { fabric } from 'fabric'
import { defineStore, storeToRefs } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import { nanoid } from 'nanoid'

type ElementTypes = 'text' | 'image' | 'video' | 'svg' | 'audio'
export interface ElementItem extends fabric.Object {
  elementId?: string
  elementType?: ElementTypes
}
export type ElementList = ElementItem[]

export const usePlayerStore = defineStore('playerStore', () => {
  // 播放状态
  const playStatus = ref(false)
  // 播放列表
  const playList = ref<string[]>([])
  // 轨道数
  const trackCount = computed<number>(() => playList.value.length)
  // 元素列表
  const elementList: Ref<ElementList> = ref([])
  // 当前选中的元素
  const focusElements: Ref<ElementList> = ref([])
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
    Object.assign(element, { elementId: nanoid(), elementType: type })
    elementList.value.push(element as ElementItem)
  }
  // 删除元素
  function removeElement(elementId: string) {
    const index = elementList.value.findIndex((item) => item.elementId === elementId)
    if (index !== -1) elementList.value.splice(index, 1)
  }
  // 设置当前元素
  function setFocusElements(
    selected: ElementList | undefined,
    deselected: ElementList | undefined,
  ) {
    if (selected) focusElements.value.push(...selected)
    if (deselected) {
      const deselectedElementId = deselected.map((item) => item.elementId || '')
      focusElements.value = focusElements.value.filter(
        (item) => !deselectedElementId.includes(item.elementId || ''),
      )
    }
  }

  return {
    playStatus,
    playList,
    trackCount,
    currentTime,
    duration,
    elementList,
    focusElements,
    togglePlay,
    addElement,
    removeElement,
    setFocusElements,
  }
})

export const usePlayerStoreWithRefs = () => storeToRefs(usePlayerStore())
