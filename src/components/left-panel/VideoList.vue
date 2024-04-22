<script setup lang="ts">
import movie from '/bird.mp4'
import { ref } from 'vue'
import emitter, { BusEvent } from '~/utils/eventBus'

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const url = URL.createObjectURL(file)
  addVideo(url)
}

// 添加视频素材
function addVideo(url: string) {
  emitter.emit(BusEvent.ElementAdd, {
    type: 'video',
    value: url
  })
}

const play = (e: MouseEvent) => {
  const target = e.target as HTMLVideoElement
  target.play()
}

const pause = (e: MouseEvent) => {
  const target = e.target as HTMLVideoElement
  target.currentTime = 0
  target.pause()
}

// TODO 后续通过请求获取
const videoList = [
  movie,
  'https://video.qiantucdn.com/58pic/00/20/21/09958PIC6FViKhIpXZgUj.mp4?e=1713729837&token=OyzEe_0O8H433pm7zVEjtnSy5dVdfpsIawO2nx3f:g-ONc7Uje6p1939AOm0wRDYeiF8=',
  'https://video.qiantucdn.com/58pic/00/20/23/02558PICNTpFqK4ncBJnV.mp4?e=1713729429&token=OyzEe_0O8H433pm7zVEjtnSy5dVdfpsIawO2nx3f:D94qjqaQseKIaqFePl36W3tIC-M=',
  'https://video.qiantucdn.com/58pic/00/20/23/06658PICsC8W4kNsdPzcI.mp4?e=1713729432&token=OyzEe_0O8H433pm7zVEjtnSy5dVdfpsIawO2nx3f:QXmhagSADXtwS87wrf2XiptAsBw=',
  'https://video.qiantucdn.com/58pic/00/20/23/11658PICbQzU5x2Y6ADcv.mp4?e=1713730089&token=OyzEe_0O8H433pm7zVEjtnSy5dVdfpsIawO2nx3f:Ja6iObmjMEe4tp7HGtkf0tNg2GU=',
  'https://video.qiantucdn.com/58pic/00/20/24/04658PICWYteCdFtdPPny.mp4?e=1713730149&token=OyzEe_0O8H433pm7zVEjtnSy5dVdfpsIawO2nx3f:FMPXA6eKGdR1_SqzD0c3YOfXBu0=',
  'https://video.qiantucdn.com/58pic/00/20/23/06g58PICCvcu5xjRX2558PICT.mp4?e=1713730152&token=OyzEe_0O8H433pm7zVEjtnSy5dVdfpsIawO2nx3f:wsPzjgOkr2yC64gl30pTGesc5pg=',
  'https://video.qiantucdn.com/58pic/00/20/22/11q58PICTnUEjWVj2D6yb.mp4?e=1713730156&token=OyzEe_0O8H433pm7zVEjtnSy5dVdfpsIawO2nx3f:hHaECUSzDGWAdYmXEztiYdvYKwY=',
  'https://video.qiantucdn.com/58pic/00/20/22/05x58PICKJHMvIwecZ7ph.mp4?e=1713728624&token=OyzEe_0O8H433pm7zVEjtnSy5dVdfpsIawO2nx3f:PPCmMoKn42iTu-3LFm-PrIU8NcM='
]
</script>
<template>
  <div class="video-list flex flex-col gap-4">
    <p class="">添加本地文件：（不会上传）</p>
    <input
      type="file"
      accept="video/*"
      class="file-input file-input-bordered file-input-md w-full max-w-xs"
      @change="onFileChange"
    />
    <p>视频素材：（开发中）</p>
    <div class="columns-2 gap-2">
      <div
        class="video-item relative mb-2 cursor-pointer rounded-md"
        v-for="(item, index) in videoList"
        :key="index"
        @click="addVideo(item)"
      >
        <video :src="item" class="rounded-md" muted loop @mouseenter="play" @mouseleave="pause" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.video-item {
  &:hover {
    // 添加按钮
    &::after {
      content: '+ 添加';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      pointer-events: none;
    }
  }
}
</style>
