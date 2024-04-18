<script setup lang="ts">
import { onMounted } from 'vue'
import { IconExport, IconGithub } from '~/assets/icons/index'
import BottomPanel from '~/components/bottom-panel/BottomPanel.vue'
import LeftPanel from '~/components/left-panel/LeftPanel.vue'
import CanvasPlayer from '~/components/player/CanvasPlayer.vue'
import RightPanel from '~/components/right-panel/RightPanel.vue'

onMounted(() => {
  // 禁止右键菜单
  document.oncontextmenu = () => false
  // onselectstart事件禁用网页上选取的内容
  document.onselectstart = () => false
  // 禁止缩放
  document.addEventListener(
    'mousewheel',
    (event: Event) => {
      // 如果是ctrl + 滚轮，阻止默认事件
      if ((event as WheelEvent).ctrlKey) event.preventDefault()
    },
    {
      capture: false, // 是否在捕获阶段执行
      passive: false // 是否是一个被动的监听器
    }
  )

  // 禁用浏览器ctrl +- 缩放
  const keyCodeMap = [
    91, // command
    61,
    107, // 数字键盘 +
    109, // 数字键盘 -
    173, // 火狐 - 号
    187, // +
    189 // -
  ]
  // 覆盖ctrl||command + ‘+’/‘-’
  document.onkeydown = function (event) {
    const e = event || window.event
    const ctrlKey = e.ctrlKey || e.metaKey
    const keyCode = e.keyCode || e.which || e.charCode
    if (ctrlKey && keyCode in keyCodeMap) {
      e.preventDefault()
    }
  }
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

        <!-- Open the modal using ID.showModal() method -->
        <button class="btn btn-sm" onclick="testModal.showModal()">
          <IconExport />
          导出
        </button>
        <dialog id="testModal" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">Hello!</h3>
            <p class="py-4">敬请期待，功能正在开发中...</p>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
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
