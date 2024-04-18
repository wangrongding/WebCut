<script setup lang="ts">
import movie from '/bird.mp4'
import { ref } from 'vue'
import emitter from '~/utils/bus'

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const url = URL.createObjectURL(file)
  addVideo(url)
}

// 添加视频素材
function addVideo(url: string) {
  emitter.emit('element:add', {
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
    <div class="grid grid-cols-2 gap-2">
      <div
        class="video-item relative cursor-pointer rounded-md"
        v-for="item in 10"
        :key="item"
        @click="addVideo(movie)"
      >
        <video :src="movie" class="rounded-md" muted loop @mouseenter="play" @mouseleave="pause" />
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
