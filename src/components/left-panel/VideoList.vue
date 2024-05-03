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
    value: url,
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
// https://www.pexels.com/zh-cn/videos/
// https://pixabay.com/videos/
const videoList = [
  movie,
  'https://cdn.pixabay.com/video/2024/04/28/209762_large.mp4',
  'https://cdn.pixabay.com/video/2024/04/29/209898_large.mp4',
  'https://cdn.pixabay.com/video/2024/04/23/209108_large.mp4',
  'https://cdn.pixabay.com/video/2023/10/27/186714-878826932_large.mp4',
  'https://cdn.pixabay.com/video/2024/04/17/208314_large.mp4',
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
