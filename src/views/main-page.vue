<script setup lang="ts">
import { onMounted } from 'vue'
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
        <!-- <h1 class="title text-xl font-bold">Video Studio</h1> -->
      </div>

      <div class="flex items-center gap-4">
        <RouterLink to="/video-clip" class="link link-info">Video Clip</RouterLink>
        <RouterLink to="/about" class="link link-info">About</RouterLink>

        <a href="https://github.com/wangrongding/WebCut" target="_blank">
          <img src="../assets/github.svg" alt="" class="h-[20px]" />
        </a>

        <button class="btn btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
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
