<script setup lang="ts">
import type { fabric } from 'fabric'
import { storeToRefs } from 'pinia'
import { IconDelete } from '~/assets/icons/index'
import { usePlayerStore } from '~/stores/player'
import emitter from '~/utils/bus'

const playerStore = usePlayerStore()
const { elementList } = storeToRefs(playerStore)

function onDelete(item: fabric.Object) {
  emitter.emit('element:delete', item)
}
</script>
<template>
  <div class="right-panel w-[400px] bg-[#272836] flex justify-between text-white">
    <div class="p-4 w-full">
      <p class="">Elements:</p>
      <div class="my-4 flex flex-col gap-4">
        <div
          class="flex justify-between border border-[#3b3b4f] p-2 items-center rounded-md"
          v-for="(item, index) in elementList"
          :key="index"
        >
          <p class="leading-[16px] h-[16px] m-0 p-0">{{ item.type }} - {{ index + 1 }}</p>
          <button class="btn btn-sm btn-error" @click="onDelete(item)">
            <IconDelete fill="white" />
          </button>
        </div>
      </div>
    </div>
    <div class="w-[60px] bg-[#1c1c26] p-8"></div>
  </div>
</template>
<style lang="scss" scoped></style>
