<script setup lang="ts">
import TrackList from './TrackList.vue'
import { storeToRefs } from 'pinia'
import IconCopy from '~/assets/icons/control-copy.svg?component'
import IconCut from '~/assets/icons/control-cut.svg?component'
import IconDelete from '~/assets/icons/control-delete.svg?component'
import IconNext from '~/assets/icons/control-next.svg?component'
import IconPause from '~/assets/icons/control-pause.svg?component'
import IconPlay from '~/assets/icons/control-play.svg?component'
import IconPrev from '~/assets/icons/control-prev.svg?component'
import IconRedo from '~/assets/icons/control-redo.svg?component'
import IconUndo from '~/assets/icons/control-undo.svg?component'
import IconZoomin from '~/assets/icons/control-zoomin.svg?component'
import IconZoomout from '~/assets/icons/control-zoomout.svg?component'
import IconZoomToFit from '~/assets/icons/control-zoomtofit.svg?component'
import { usePlayerStore } from '~/stores/player'

const playerStore = usePlayerStore()
// 将 store 中的 playStatus 转换为 ref
const { playStatus } = storeToRefs(playerStore)

function toggleVideoPlay() {
  playerStore.playStatus = !playStatus.value
}
</script>
<template>
  <div class="bottom-panel h-[300px] bg-[#17171e] pb-2 px-4 text-white flex flex-col">
    <!-- 刻度尺 -->
    <div class="flex border-y justify-between border-[#272836] h-[40px] items-center gap-2">
      <div class="flex gap-2">
        <button class="tooltip btn-control" data-tip="撤销"><IconUndo /></button>
        <button class="tooltip btn-control" data-tip="恢复"><IconRedo /></button>
        <button class="tooltip btn-control" data-tip="分割"><IconCut /></button>
        <button class="tooltip btn-control" data-tip="删除"><IconDelete /></button>
        <button class="tooltip btn-control" data-tip="复制"><IconCopy /></button>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn-control"><IconPrev /></button>
        <button class="btn-control" v-if="playStatus" @click="toggleVideoPlay">
          <IconPause />
        </button>
        <button class="btn-control" v-else @click="toggleVideoPlay">
          <IconPlay />
        </button>
        <button class="btn-control"><IconNext /></button>
        <span>00:00:00 / 00:00:00</span>
      </div>
      <div class="flex gap-4">
        <button class="tooltip btn-control" data-tip="放大"><IconZoomout /></button>
        <div class="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value="40"
            class="range range-xs [--range-shdw:#00a7ea]"
          />
          {{ '40%' }}
        </div>
        <button class="tooltip btn-control" data-tip="缩小"><IconZoomin /></button>
        <button class="tooltip" data-tip="适配到合适的大小">
          <IconZoomToFit class="btn-control" />
        </button>
        <button>预览</button>
      </div>
    </div>

    <!-- 轨道列表 -->
    <TrackList />
  </div>
</template>
<style scoped>
.btn-control {
  @apply rounded-sm hover:bg-[#ee2788];
}
</style>
