<script setup lang="ts">
import IconMusic from '~/assets/icons/icon-music.svg?component'
import IconText from '~/assets/icons/icon-text.svg?component'
import movie from '/bird.mp4'
import { MP4Clip } from '@WebAV/av-cliper'
import { watchEffect, ref } from 'vue'
type Thumbnail = {
  img: string
  ts: number
};
const thumbnails = ref<Thumbnail[]>([])
watchEffect(async () => {
  // const clip = new MP4Clip((await fetch('https://assets.fedtop.com/picbed/movie.mp4')).body!)
  const clip = new MP4Clip((await fetch(movie)).body!)
  await clip.ready
  // keyframe thumbnails
  thumbnails.value = (await clip.thumbnails()).map(it => ({
    img: URL.createObjectURL(it.img),
    ts: it.ts
  }))
})
</script>

<template>
  <div class="grid content-center flex-1 text-center">
    <div class="element-track">
      <div class="flex gap-2">
        <IconText />
        <span>+ 添加文字等素材</span>
      </div>
    </div>
    <div class="video-track">
      <div class="flex overflow-auto">
        <div class="flex-none" v-for="img in thumbnails" :key="img.ts">
          <img :src="img.img" :title="(img.ts / 1e6).toFixed(2) + 's'" />
        </div>
      </div>
    </div>
    <div class="music-track">
      <div class="flex gap-2">
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
  width: 100%;
  padding-left: 10px;
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
