<script setup lang="ts">
import VideoTrack, { type GetThumbnailBySeekOptions } from './VideoTrack.vue'
import movie from '/bird.mp4'
import { watchEffect, ref, computed } from 'vue'
import { IconMusic, IconText, IconVideo } from '~/assets/icons/index'

watchEffect(async () => {})
const videoTrackList = computed<GetThumbnailBySeekOptions[]>(() => {
  return [
    {
      url: movie,
      count: 5,
      clipStart: 0,
      clipEnd: 10,
    },
  ]
})
</script>
<template>
  <div class="grid h-full flex-1 content-center overflow-x-scroll text-center">
    <div class="element-track">
      <div class="flex gap-2 pl-[10px]">
        <IconText />
        <span>+ 添加文字等素材</span>
      </div>
    </div>
    <div class="video-track">
      <div class="flex gap-2 pl-[10px]" v-if="videoTrackList.length === 0">
        <IconVideo />
        <span>+ 视频轨道</span>
      </div>
      <div v-else class="flex flex-row flex-nowrap">
        <VideoTrack
          v-for="(item, index) in videoTrackList"
          :key="index"
          :url="item.url"
          :count="item.count"
          :clip-start="item.clipStart"
          :clip-end="item.clipEnd"
        />
      </div>
    </div>
    <div class="music-track">
      <div class="flex gap-2 pl-[10px]">
        <IconMusic />
        <span>+ 添加音频</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.music-track,
.video-track,
.element-track {
  font-size: 0.875rem;
  margin: 4px 0px;
  display: flex;
  align-items: center;
  border: 2px dashed rgb(59, 59, 79);
  color: rgb(110, 110, 134);
  border-radius: 5px;
  cursor: pointer;
  height: 28px;
}
.video-track {
  // justify-items: flex-start;
  // align-content: center;
  transition: width 200ms ease-out 0s;
  position: relative;
  height: 75px;
  background: rgb(30, 30, 41);
}
.music-track {
  background: url('~/assets/imgs/music-ripples.png') left center / auto 100% repeat-x;
}
</style>
