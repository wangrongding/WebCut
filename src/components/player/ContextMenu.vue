<script setup lang="ts">
import { reactive, ref } from 'vue'

type Menu = {
  key: string // key
  text: string // 文本
  shortkey?: string // 快捷键
  callback: Function // 回调
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
    class="context-menu-container absolute flex w-[200px] flex-col gap-1 border border-[#505067] bg-[#1E1E29] p-2 text-[#D5D5E1]"
  >
    <button
      class="flex justify-between rounded-sm p-1 text-left hover:bg-[#3B3B4F]"
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
