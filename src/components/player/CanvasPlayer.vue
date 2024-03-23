<script setup lang="ts">
import { fabric } from 'fabric'
import { onMounted, ref } from 'vue'
import Logo from '~/assets/github.svg'

defineProps<{
  msg: string
}>()
let canvas: fabric.Canvas
let ctx: CanvasRenderingContext2D
const container = ref<HTMLElement | null>(null)

function initCanvas() {
  canvas = new fabric.Canvas('canvas', {
    selection: true,
    hoverCursor: 'pointer',
    backgroundColor: '#000'
  })
  resizePlayer()
  canvas.on('mouse:down', canvasOnMouseDown)
  ctx = canvas.getContext()
  drawElements()
}

function drawElements() {
  drawStaticElements()
  drawVideo()
  canvas.renderAll()
}

// 绘制图片
function drawStaticElements() {
  // 绘制 svg
  fabric.loadSVGFromURL(Logo, (objects, options) => {
    const obj = fabric.util.groupSVGElements(objects, options)
    obj.set({
      scaleX: 5,
      scaleY: 5,
      left: canvas.width! / 2 - (obj.width! * 5) / 2,
      top: canvas.height! / 2 - (obj.height! * 5) / 2,
      angle: 0
    })
    canvas.add(obj)
  })
  // 添加文字
  const text = new fabric.Text('开发中...', {
    left: 100,
    top: 100,
    fill: 'white',
    fontSize: 30
  })
  canvas.add(text)
}

// 绘制视频
function drawVideo() {
  const video = document.createElement('video')
  video.src = 'https://assets.fedtop.com/picbed/movie.mp4'

  video.autoplay = true
  video.loop = true
  // 不静音就无法在未点击的情况下自动播放
  video.muted = true

  video.addEventListener('loadedmetadata', () => {
    // 视频源宽高
    video.width = video.videoWidth
    video.height = video.videoHeight
    video.play()

    const videoEl = new fabric.Image(video, {
      left: canvas.width! / 2 - video.width! / 2,
      top: canvas.height! / 2 - video.height! / 2,
      angle: 0,
      originX: 'left',
      originY: 'top'
    })
    canvas.add(videoEl)
    continuouslyRepaint()
  })
}

// 持续重绘
function continuouslyRepaint() {
  canvas.renderAll()
  fabric.util.requestAnimFrame(continuouslyRepaint)
}

function resizePlayer() {
  const width = container.value!.clientWidth
  const height = container.value!.clientHeight
  canvas.setDimensions({
    width,
    height
  })
}

function canvasOnMouseDown() {}

onMounted((): void => {
  initCanvas()
})
</script>
<template>
  <div class="h-full w-full overflow-hidden" ref="container">
    <canvas id="canvas"></canvas>
  </div>
</template>
<style lang="scss" scoped></style>
