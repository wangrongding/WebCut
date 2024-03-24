<script setup lang="ts">
import movie from '/bird.mp4'
// mp4box 目前没有较好的 ts 类型支持
import MP4Box from 'mp4box'
import { onMounted } from 'vue'

async function getVideoBuffer(url: string) {
  // 首先要对视频进行解封装
  const fileBuffer = await fetch(url).then((res) => res.arrayBuffer())
  return fileBuffer
}

// 获取视频信息
function getVideoInfo(fileBuffer: ArrayBuffer) {
  const mp4box = MP4Box.createFile()
  mp4box.appendBuffer(fileBuffer)
  mp4box.onReady = (info: any) => {
    // console.log('mp4box ready', info)
  }
  mp4box.onSegment = (id: any, user: any, buffer: any, sampleNum: any) => {
    // console.log('mp4box segment', id, user, buffer, sampleNum)
  }
  mp4box.start()
}

// 使用 webcodecs 对视频进行解码

// WebCodecs在性能上毫无疑问是完全碾压使用wasm集成的传统音视频处理库如ffmpeg，目前的主要问题在于兼容性不好，例如视频就不支持h265等编码格式，同时api也还不够完善，不过考虑到这是w3c的一个实验性技术，在未来可能会有更好的发展，从而取代目前的前端音视频处理方案。

onMounted(() => {})
</script>
<template>
  <div class="about p-10">
    <h1 class="mb-5 text-3xl font-bold">WebCut</h1>
    <p>视频裁剪 开发中。</p>

    <RouterLink to="/">回到编辑器</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.clip-page {
  flex: 1;
  border: 1px solid black;
}
</style>
