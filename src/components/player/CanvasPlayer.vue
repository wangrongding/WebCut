<script setup lang="ts">
import movie from '/bird.mp4'
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
  drawVideo()
  drawStaticElements()
  canvas.renderAll()
}

// 绘制图片
function drawStaticElements() {
  // 绘制 svg
  fabric.loadSVGFromURL(Logo, (objects, options) => {
    const obj = fabric.util.groupSVGElements(objects, options)
    obj.set({
      scaleX: 2,
      scaleY: 2,
      left: 300,
      top: 40,
      // left: canvas.width! / 2 - (obj.width! * 5) / 2,
      // top: canvas.height! / 2 - (obj.height! * 5) / 2,
      angle: 0
    })
    canvas.add(obj)
  })
  // 添加文字
  const text = new fabric.Text('开发中...', {
    left: 20,
    top: 20,
    fill: 'white',
    fontSize: 20
  })
  canvas.add(text)
}

// 绘制视频
// TODO 需要实现通过 webcodecs 进行视频解码后绘制
function drawVideo() {
  const video = document.createElement('video')
  // video.src = 'https://assets.fedtop.com/picbed/movie.mp4'
  video.src = movie
  video.autoplay = true
  video.loop = true
  // 不静音就无法在未点击的情况下自动播放
  video.muted = true
  const canvasWidth = canvas.width!
  const canvasHeight = canvas.height!

  video.addEventListener('loadedmetadata', () => {
    // 视频源宽高
    const videoWidth = video.videoWidth
    const videoHeight = video.videoHeight
    video.width = videoWidth
    video.height = videoHeight
    // 适配画布大小（如果 宽>高，以宽为准,反之以高为准）
    const scale = Math.min(canvasWidth / videoWidth, canvasHeight / videoHeight)
    const videoElement = new fabric.Image(video, {
      scaleX: scale,
      scaleY: scale,
      // 水平垂直居中
      left: canvasWidth / 2 - (videoWidth * scale) / 2,
      top: canvasHeight / 2 - (videoHeight * scale) / 2,
      angle: 0,
      originX: 'left',
      originY: 'top'
    })
    canvas.add(videoElement)
    canvas.setActiveObject(videoElement)
    continuouslyRepaint()
    // TODO 修改成外部控制
    video.play()
  })
}

// 持续重绘
function continuouslyRepaint() {
  canvas.renderAll()
  fabric.util.requestAnimFrame(continuouslyRepaint)
}

// 初始化控件
// TODO 需要根据不同的元素类型，定制不同的控件功能以及显示
function initControls() {
  // 修改控件显示
  fabric.Object.prototype.setControlsVisibility({
    mt: false, // 上边裁剪
    mb: false, // 下边裁剪
    ml: false, // 左侧裁剪
    mr: true, // 右侧裁剪
    bl: true, // 左下角缩放
    br: true, // 右下角缩放
    tl: true, // 左上角缩放
    tr: true, // 右上角缩放
    mtr: true // 旋转
  })
  // 修改控件颜色
  fabric.Object.prototype.set({
    borderColor: '#fff', // 控制边框颜色
    cornerColor: '#fff', // 控制控件颜色
    cornerStrokeColor: '#fff', // 控制控件边框颜色
    cornerSize: 10, // 控制控件大小
    cornerStyle: 'circle', // 控制控件形状
    transparentCorners: false // 控制控件是否透明
  })
  // 修改所有图片类型的 mr 控件的 actionHandler
  fabric.Object.prototype.controls.mr.actionHandler = (eventData, transform, x, y) => {
    const target = transform.target as fabric.Transform['target'] & {
      _originalElement: HTMLImageElement
    }
    const originWidth = target._originalElement.width
    const originHeight = target._originalElement.height
    // 这里应该有个原始大小的获取方法
    // const originSize = xxxx.getOriginalSize()
    // 右侧裁剪
    const w = target.width! * target.scaleX!
    const h = target.height! * target.scaleY!
    const newWidth = x - target.left!
    // 限制最大,最小宽
    if (x < target.left! || newWidth < 50) return false
    if (newWidth > originWidth) return false
    target.set({
      width: newWidth
    })
    target.setCoords()
    canvas.requestRenderAll()
    return true
  }

  // 添加删除按钮
  addDeleteButton()
}
// editor 添加删除按钮
function addDeleteButton() {
  // 有些地方也有用 fabric.Object.prototype.controls.delete
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    // offsetX: -26,
    offsetY: -26,
    cursorStyle: 'pointer',
    mouseUpHandler: (eventData, transform) => {
      var target = transform.target
      var canvas = target.canvas!
      canvas.remove(target)
      canvas.requestRenderAll()
      return true
    },
    render: (ctx, left, top, styleOverride, fabricObject) => {
      const size = 10
      const stroke = ctx.strokeStyle
      ctx.strokeStyle = styleOverride.strokeStyle
      ctx.beginPath()
      ctx.arc(left, top, size, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(left - size / 2, top - size / 2)
      ctx.lineTo(left + size / 2, top + size / 2)
      ctx.moveTo(left - size / 2, top + size / 2)
      ctx.lineTo(left + size / 2, top - size / 2)
      ctx.closePath()
      ctx.stroke()
      ctx.strokeStyle = stroke
      return fabricObject
    }
  })
}

// TODO 需完善窗口大小变化时，画布保持当前宽高比进行缩放
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
  // 初始化画布
  initCanvas()
  // 初始化控件
  initControls()
})
</script>
<template>
  <div class="h-full w-full overflow-hidden" ref="container">
    <canvas id="canvas"></canvas>
  </div>
</template>
<style lang="scss" scoped></style>
