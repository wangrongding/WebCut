<script setup lang="ts">
import { ref } from 'vue'

export interface GetThumbnailBySeekOptions {
  url: string // 视频地址
  count: number // 抽帧数量
  clipStart?: number // 裁剪开始时间
  clipEnd?: number // 裁剪结束时间
}

const props = defineProps<GetThumbnailBySeekOptions>()
const thumbnails = ref<{ img: string; ts: number }[]>([])

// 通过 video + canvas 对视频进行抽帧 (后续是否统一使用 WebCodecs API 待定)
async function getThumbnailBySeek(options: GetThumbnailBySeekOptions) {
  const { url, count, clipStart, clipEnd } = options
  const video = document.createElement('video')
  video.src = url
  video.crossOrigin = 'anonymous' // 跨域, 防止污染
  video.preload = 'auto' // 不加会导致黑屏
  video.muted = true
  video.currentTime = clipStart || 0
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  let duration = 0
  let currentTime = 0
  const generateThumbnail = () => {
    currentTime = parseFloat(currentTime.toFixed(4))

    // 跳转到指定时间，触发seeked事件
    video.currentTime = currentTime
    if (currentTime < duration) {
      // 间隔
      const gap = duration / count
      currentTime += gap
    } else {
      video.removeEventListener('seeked', getThumbnail)
    }
  }

  const getThumbnail = () => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      thumbnails.value.push({ img: url, ts: currentTime })
      generateThumbnail()
    })
  }

  video.addEventListener('seeked', getThumbnail)
  video.addEventListener('loadeddata', async () => {
    duration = clipEnd && clipStart ? clipEnd - clipStart : video.duration
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    getThumbnail()
  })
}
getThumbnailBySeek(props)
</script>
<template>
  <div class="flex">
    <img
      :src="img.img"
      class="h-[70px]"
      v-for="img in thumbnails"
      :key="img.ts"
      :title="img.ts.toFixed(2) + 's'"
    />
  </div>
</template>
<style lang="scss" scoped></style>
