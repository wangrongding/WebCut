<script setup lang="ts">
import { reactive, ref } from 'vue'

type Menu = {
  key: string // key
  text: string // 文本
  shortkey?: string // 快捷键
  callback: () => void // 回调
}

defineProps<{ menuList: Menu[] }>()
const contextMenu = ref<HTMLElement | null>(null)

defineExpose({
  contextMenu
})
</script>
<template>
  <div
    ref="contextMenu"
    class="context-menu-container w-[200px] flex flex-col gap-1 absolute bg-[#1E1E29] border-[#505067] border text-[#D5D5E1] p-2"
  >
    <button
      class="hover:bg-[#3B3B4F] text-left p-1 rounded-sm flex justify-between"
      v-for="(item, index) in menuList"
      :key="index"
      @click="item.callback"
    >
      <span>{{ item.text }}</span>
      <span v-if="item.shortkey">{{ item.shortkey }}</span>
    </button>
  </div>
</template>
<style lang="scss" scoped></style>
