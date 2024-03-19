<script setup lang="ts"></script>

<template>
  <div class="main flex gap-1 text-white flex-col bg-[#161618] h-full">
    <!-- 头部 -->
    <header class="flex justify-between bg-[#282c34] items-center h-[50px] px-6">
      <div class="flex gap-2 items-center">
        <!-- logo -->
        <img src="../assets/logo.svg" alt="" class="h-[20px]" />
        <!-- title -->
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

    <div class="flex gap-1 flex-1">
      <!-- 左边栏 -->
      <div class="left-box bg-[#282c34] p-8 w-[400px]">left-box</div>
      <!-- 内容区域 -->
      <div class="flex-col flex gap-1 flex-1">
        <div class="flex gap-1 flex-1">
          <!-- 画布 -->
          <div class="flex-1 bg-[#282c34] p-8">player</div>
          <!-- 右边栏 -->
          <div class="right-panel bg-[#282c34] p-8 w-[300px]">right-panel</div>
        </div>
        <!-- 底部栏 -->
        <div class="bottom-panel bg-[#282c34] p-8 h-[300px]">bottom-panel</div>
      </div>
    </div>
  </div>
</template>
