<script setup lang="ts"></script>

<template>
  <div class="main flex gap-1 text-white flex-col bg-[#161618] h-full">
    <!-- 头部 -->
    <header class="header flex bg-[#282c34] p-8 gap-8">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <p>这是一个基于 web 端的视频编辑器，正在开发中。</p>
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
