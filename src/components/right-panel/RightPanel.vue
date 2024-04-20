<script setup lang="ts">
import type { fabric } from 'fabric'
import { storeToRefs } from 'pinia'
import {
  IconDelete,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignTop,
  IconAlignMiddle,
  IconAlignBottom,
  IconLayerTop,
  IconLayerBottom,
  IconLayerUp,
  IconLayerDown
} from '~/assets/icons/index'
import { usePlayerStoreWithRefs } from '~/stores/player'
import emitter from '~/utils/bus'

const { elementList } = usePlayerStoreWithRefs()

function onDelete(item: fabric.Object) {
  emitter.emit('element:delete', item)
}

function onAlign(align: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') {
  emitter.emit('element:align', align)
}

function onLayer(align: 'up' | 'down' | 'top' | 'bottom') {
  emitter.emit('element:layer', align)
}
</script>
<template>
  <div class="right-panel flex w-[400px] justify-between bg-[#272836] text-white">
    <div class="w-full p-4">
      <p class="panel-title">元素层级:</p>
      <div class="my-2 grid grid-cols-2 gap-4">
        <div class="layer-btn" @click="onLayer('up')">
          <IconLayerUp fill="white" />
          <span>上移一层</span>
        </div>
        <div class="layer-btn" @click="onLayer('down')">
          <IconLayerDown fill="white" />
          <span>下移一层</span>
        </div>
        <div class="layer-btn" @click="onLayer('top')">
          <IconLayerTop fill="white" />
          <span>置于顶层</span>
        </div>
        <div class="layer-btn" @click="onLayer('bottom')">
          <IconLayerBottom fill="white" />
          <span>置于底层</span>
        </div>
      </div>
      <p class="panel-title">对齐方式:</p>
      <div class="flex h-[40px] items-center justify-between gap-4">
        <div class="position-btn" @click="onAlign('left')">
          <IconAlignLeft fill="white" />
        </div>
        <div class="position-btn" @click="onAlign('center')">
          <IconAlignCenter fill="white" />
        </div>
        <div class="position-btn" @click="onAlign('right')">
          <IconAlignRight fill="white" />
        </div>
        <div class="position-btn" @click="onAlign('top')">
          <IconAlignTop fill="white" />
        </div>
        <div class="position-btn" @click="onAlign('middle')">
          <IconAlignMiddle fill="white" />
        </div>
        <div class="position-btn" @click="onAlign('bottom')">
          <IconAlignBottom fill="white" />
        </div>
      </div>
      <p class="panel-title">元素列表:</p>
      <div class="my-4 flex flex-col gap-4">
        <div
          class="flex items-center justify-between rounded-md border border-[#3b3b4f] p-2"
          v-for="(item, index) in elementList"
          :key="index"
        >
          <p class="m-0 h-[16px] p-0 leading-[16px]">{{ item.type }} - {{ index + 1 }}</p>
          <button class="btn btn-error btn-sm" @click="onDelete(item)">
            <IconDelete fill="white" />
          </button>
        </div>
      </div>
    </div>
    <div class="w-[60px] bg-[#1c1c26] p-8"></div>
  </div>
</template>
<style lang="scss" scoped>
.panel-title {
  @apply font-bold leading-6;
}
.position-btn {
  @apply flex h-[30px] w-[30px] items-center justify-center rounded-md hover:bg-slate-400;
}
.layer-btn {
  @apply flex w-[110px] cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-slate-400;
}
</style>
