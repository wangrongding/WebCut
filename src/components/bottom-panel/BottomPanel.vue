<script setup lang="ts">
import mitt from 'mitt'
import IconCopy from '~/assets/icons/control-copy.svg?component'
import IconCut from '~/assets/icons/control-cut.svg?component'
import IconDelete from '~/assets/icons/control-delete.svg?component'
import IconNext from '~/assets/icons/control-next.svg?component'
import IconPause from '~/assets/icons/control-pause.svg?component'
import IconPrev from '~/assets/icons/control-prev.svg?component'
import IconRedo from '~/assets/icons/control-redo.svg?component'
import IconUndo from '~/assets/icons/control-undo.svg?component'
import IconZoomin from '~/assets/icons/control-zoomin.svg?component'
import IconZoomout from '~/assets/icons/control-zoomout.svg?component'
import IconZoomToFit from '~/assets/icons/control-zoomtofit.svg?component'

const emitter = mitt()
function toggleVideoPlay() {
  emitter.emit('player:toggle-play')
}
</script>
<template>
  <div class="bottom-panel h-[300px] bg-[#17171e] pb-2 px-4 text-white flex flex-col">
    <!-- 刻度尺 -->
    <div class="flex border-y justify-between border-[#272836] h-[40px] items-center gap-2">
      <div class="flex gap-2">
        <button><IconUndo /></button>
        <button><IconRedo /></button>
        <button><IconCut /></button>
        <button><IconDelete /></button>
        <button><IconCopy /></button>
      </div>
      <div class="flex items-center gap-2">
        <button><IconPrev /></button>
        <button><IconPause /></button>
        <button><IconNext /></button>
        <span>00:00:00 / 00:00:00</span>
      </div>
      <div class="flex gap-4">
        <button><IconZoomout /></button>
        <button><IconZoomin /></button>
        <button><IconZoomToFit /></button>
        <button>预览</button>
      </div>
    </div>

    <div class="grid content-center flex-1 text-center">bottom-panel ( 开发中... )</div>
  </div>
</template>
<style lang="scss" scoped></style>
