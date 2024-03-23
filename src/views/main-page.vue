<script setup lang="ts">
import { onMounted } from 'vue'
import CanvasPlayer from '~/components/player/CanvasPlayer.vue'

onMounted(() => {
  // 禁止右键菜单
  document.oncontextmenu = () => false
  // onselectstart事件禁用网页上选取的内容
  document.onselectstart = () => false
})
</script>

<template>
  <div class="main flex h-full flex-col gap-1 bg-[#161618] text-white">
    <!-- 头部 -->
    <header class="flex h-[50px] items-center justify-between bg-[#282c34] px-6">
      <div class="flex items-center gap-2">
        <img src="/favicon.svg" alt="" class="logo h-[20px] w-[20px]" />
        <h1 class="title text-xl font-bold">Video Studio</h1>
      </div>

      <div class="flex items-center">
        <RouterLink to="/about">About</RouterLink>
        <a href="https://github.com/wangrongding/video-studio" target="_blank" class="ml-4">
          <img src="../assets/github.svg" alt="" class="h-[20px]" />
        </a>
      </div>
    </header>

    <div class="flex flex-1 gap-1">
      <!-- 左边栏 -->
      <div class="left-box w-[400px] min-w-[300px] bg-[#282c34] p-8">
        left-panel
        <span>( 开发中... )</span>
      </div>

      <!-- 内容区域 -->
      <div class="flex flex-1 flex-col gap-1">
        <div class="flex flex-1 gap-1">
          <!-- 视频画布 -->
          <div class="canvas-player-container flex-1 bg-[#282c34] p-8">
            <CanvasPlayer msg="hello" />
          </div>
          <!-- 右边属性设置栏 -->
          <div class="right-panel w-[300px] bg-[#282c34] p-8">
            right-panel
            <span>( 开发中... )</span>
          </div>
        </div>

        <!-- 底部轨道栏 -->
        <div class="bottom-panel h-[300px] bg-[#282c34] p-8">
          bottom-panel
          <span>( 开发中... )</span>
        </div>
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
