<script setup lang="ts">
import { onMounted } from 'vue'
import IconExport from '~/assets/icons/icon-export.svg?component'
import IconGithub from '~/assets/icons/icon-github.svg?component'
import BottomPanel from '~/components/bottom-panel/BottomPanel.vue'
import LeftPanel from '~/components/left-panel/LeftPanel.vue'
import CanvasPlayer from '~/components/player/CanvasPlayer.vue'
import RightPanel from '~/components/right-panel/RightPanel.vue'

onMounted(() => {
  // 禁止右键菜单
  document.oncontextmenu = () => false
  // onselectstart事件禁用网页上选取的内容
  document.onselectstart = () => false
})
</script>

<template>
  <div class="main flex h-full flex-col gap-[1px] bg-[#2c2d3c]">
    <!-- 头部 -->
    <header class="flex h-[50px] items-center justify-between bg-[#1c1c26] px-6">
      <div class="flex items-center gap-2">
        <img src="/favicon.svg" alt="" class="logo h-[20px] w-[20px]" />
        <h1 class="title text-xl font-bold">WebCut</h1>
        <!-- TODO 名字感觉很一般，是否还需要再换？ -->
        <!-- <h1 class="title text-xl font-bold">Video Studio</h1> -->
      </div>

      <div class="flex items-center gap-4">
        <RouterLink to="/video-clip" class="link link-info">Video Clip</RouterLink>
        <RouterLink to="/about" class="link link-info">About</RouterLink>

        <a href="https://github.com/wangrongding/WebCut" target="_blank">
          <IconGithub class="h-[20px] w-[20px]" />
        </a>

        <button class="btn btn-sm">
          <IconExport />
          导出
        </button>
      </div>
    </header>

    <div class="flex flex-1 gap-[1px]">
      <!-- 左边栏 -->
      <LeftPanel />

      <!-- 内容区域 -->
      <div class="flex flex-1 flex-col gap-[1px]">
        <div class="flex flex-1 gap-[1px]">
          <!-- 视频画布 -->
          <div class="canvas-player-container flex-1 bg-[#1c1c26] px-10 pt-10">
            <CanvasPlayer msg="hello" />
          </div>
          <!-- 右边属性设置栏 -->
          <RightPanel />
        </div>

        <!-- 底部轨道栏 -->
        <BottomPanel />
      </div>
    </div>
  </div>
</template>

<style>
.logo,
.title {
  width: fit-content;
  user-select: none;
  background: -webkit-linear-gradient(0deg, #ee2788 0%, #00a7ea 100%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
