<script setup lang="ts"></script>

<template>
  <div class="main">
    <!-- 头部 -->
    <header class="header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <p>这是一个基于 web 端的视频编辑器，正在开发中。</p>
    </header>
    <!-- 主体 -->
    <div class="container">
      <!-- 左边栏 -->
      <div class="left-box">left-box</div>
      <!-- 内容区域 -->
      <div class="right-box">
        <!-- 画布 -->
        <div class="center-box">
          <div class="player">player</div>
          <div class="right-panel">right-panel</div>
        </div>
        <!-- 底部栏 -->
        <div class="bottom-panel">bottom-panel</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: beige;

  .header {
    display: flex;
    gap: 20px;
    background-color: #282c34;
    color: white;
    padding: 20px;
  }

  .container {
    flex: 1;
    display: flex;

    .left-box {
      width: 400px;
      background-color: #24272c;
      color: white;
      padding: 20px;
      height: 100%;
      border: 2px solid #b6bbc6;
    }

    .right-box {
      width: 100%;
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      .center-box {
        flex: 1;
        display: flex;
        .right-panel {
          width: 300px;
          background-color: #24272c;
          color: white;
          padding: 20px;
          height: 100%;
          border: 2px solid #b6bbc6;
        }
        .player {
          flex: 1;
          background-color: #24272c;
          color: white;
          padding: 20px;
          height: 100%;
          border: 2px solid #b6bbc6;
        }
      }

      .bottom-panel {
        background-color: #24272c;
        color: white;
        padding: 20px;
        border: 2px solid #b6bbc6;
        height: 300px;
      }
    }
  }
}
</style>
