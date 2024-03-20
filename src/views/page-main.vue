<script setup lang="ts"></script>

<template>
  <div class="main flex h-full flex-col gap-1 bg-[#161618] text-white">
    <!-- 头部 -->
    <header class="flex h-[50px] items-center justify-between bg-[#282c34] px-6">
      <!-- logo -->
      <div class="flex items-center gap-2">
        <img src="../assets/logo.svg" alt="" class="h-[20px]" />
        <h1 class="text-xl font-bold">Video Studio</h1>
        <span>( 开发中... )</span>
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
      <div class="left-box w-[400px] bg-[#282c34] p-8">left-box</div>

      <!-- 内容区域 -->
      <div class="flex flex-1 flex-col gap-1">
        <div class="flex flex-1 gap-1">
          <!-- 视频画布 -->
          <div class="flex-1 bg-[#282c34] p-8">player</div>
          <!-- 右边属性设置栏 -->
          <div class="right-panel w-[300px] bg-[#282c34] p-8">right-panel</div>
        </div>

        <!-- 底部轨道栏 -->
        <div class="bottom-panel h-[300px] bg-[#282c34] p-8">bottom-panel</div>
      </div>
    </div>
  </div>
</template>
