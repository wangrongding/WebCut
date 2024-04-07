<script setup lang="ts">
import ContextMenu from './ContextMenu.vue'
import movie from '/bird.mp4'
import { fabric } from 'fabric'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import Logo from '~/assets/icons/icon-github.svg'
import { usePlayerStore } from '~/stores/player'
import emitter from '~/utils/bus'

defineProps<{
  msg: string
}>()
const container = ref<HTMLElement | null>(null)
let video: HTMLVideoElement
const playerStore = usePlayerStore()
const { playStatus } = storeToRefs(playerStore)
const menuShow = ref(false)
const contextMenuPosition = ref({ x: 0, y: 0 })
const contextMenu = ref<typeof ContextMenu | null>(null)
let canvas: fabric.Canvas
let ctx: CanvasRenderingContext2D
let clipboard: fabric.Object | null = null

const menuList = [
  { key: 'flipX', shortkey: '⌘+C', text: '复制', callback: onCopy },
  { key: 'flipX', shortkey: '⌘+V', text: '粘贴', callback: onPaste },
  { key: 'flipX', shortkey: 'Del', text: '删除', callback: deleteElement },
  { key: 'flipY', shortkey: '⌘+]', text: '上移一层', callback: () => setElementLayer('up') },
  { key: 'flipY', shortkey: '⌘+[', text: '下移一层', callback: () => setElementLayer('down') },
  { key: 'flipY', shortkey: '', text: '置于顶层', callback: () => {} },
  { key: 'flipY', shortkey: '', text: '置于底层', callback: () => {} },
  { key: 'flipX', shortkey: '', text: '旋转90°', callback: () => {} },
  { key: 'flipX', shortkey: '', text: '左右翻转', callback: () => flip('x') },
  { key: 'flipY', shortkey: '', text: '垂直翻转', callback: () => flip('y') }
]

emitter.on('element:copy', onCopy)
emitter.on('element:paste', onPaste)
watch(playStatus, () => {
  if (playStatus.value) {
    video.play()
  } else {
    video.pause()
  }
})

function initCanvas() {
  canvas = new fabric.Canvas('canvas', {
    fireRightClick: true, // 启用右键，button的数字为 3
    stopContextMenu: true, // 禁止默认右键菜单
    selection: true, // 是否开启选择
    hoverCursor: 'pointer', // 鼠标悬停时的样式
    backgroundColor: '#000' // 画布背景色
  })
  resizePlayer()
  canvas.on('mouse:down', canvasOnMouseDown)
  // 目标移动中
  canvas.on('object:moving', (e) => {
    if (!e.target) return
    e.target.opacity = 0.5
  })
  // 目标修改后
  canvas.on('object:modified', (e) => {
    if (!e.target) return
    e.target.opacity = 1
  })

  ctx = canvas.getContext()
  drawElements()
}

// 绘制元素
function drawElements() {
  drawVideo()
  drawStaticElements()
  canvas.renderAll()
}

// 删除元素
function deleteElement() {
  const activeObject = canvas.getActiveObject()
  if (!activeObject) return
  canvas.remove(activeObject)
  canvas.requestRenderAll()
  menuShow.value = false
}

// 绘制图片
function drawStaticElements() {
  // 绘制 svg
  fabric.loadSVGFromURL(Logo, (objects, options) => {
    const obj = fabric.util.groupSVGElements(objects, options)
    obj.set({
      scaleX: 2,
      scaleY: 2,
      left: canvas.width! / 2 - (obj.width! * 5) / 2,
      top: canvas.height! / 2 - (obj.height! * 5) / 2,
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
  video = document.createElement('video')
  // video.src = 'https://assets.fedtop.com/picbed/movie.mp4'
  video.src = movie
  video.loop = true
  video.preload = 'auto' // 不加会导致未播放时元素黑屏
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

// 设置元素层级
function setElementLayer(type: 'up' | 'down') {
  const activeObject = canvas.getActiveObject()
  if (!activeObject) return
  if (type === 'up') {
    // 上移一层
    canvas.bringForward(activeObject)
  } else {
    // 下移一层
    canvas.sendBackwards(activeObject)
  }
  canvas.discardActiveObject()
  menuShow.value = false
}

// 复制元素
function onCopy() {
  const activeObject = canvas.getActiveObject()
  if (!activeObject) return
  activeObject.clone((cloned: fabric.Object) => {
    clipboard = cloned
  })
  menuShow.value = false
}

// 剪切元素
function onCut() {
  const activeObject = canvas.getActiveObject()
  if (!activeObject) return
  onCopy()
  canvas.remove(activeObject)
}

// TODO 视频元素为什么无法复制
// 粘贴元素
function onPaste() {
  if (clipboard === null) return
  // clone again, so you can do multiple copies.
  clipboard!.clone((clonedObj: any) => {
    canvas.discardActiveObject()
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true
    })
    if (clonedObj.type === 'activeSelection') {
      // active selection needs a reference to the canvas.
      clonedObj.canvas = canvas
      clonedObj.forEachObject((obj: any) => {
        canvas.add(obj)
      })
      // this should solve the unselectability
      clonedObj.setCoords()
    } else {
      canvas.add(clonedObj)
    }
    clipboard!.top! += 10
    clipboard!.left! += 10
    canvas.setActiveObject(clonedObj)
    canvas.requestRenderAll()
    menuShow.value = false
  })
}

// 翻转元素
function flip(flipType: 'x' | 'y') {
  const activeObject = canvas.getActiveObject()
  if (!activeObject) return
  const type = flipType === 'x' ? 'flipX' : 'flipY'
  activeObject.set({
    [type]: !activeObject.get(type)
  })
  canvas?.renderAll()
}

// 初始化右键菜单
function initContextMenu(e: fabric.IEvent<MouseEvent>) {
  if (!e.target) return
  canvas.setActiveObject(e.target)
  contextMenuPosition.value.x = e.pointer!.x
  contextMenuPosition.value.y = e.pointer!.y
  menuShow.value = true
  const menu = contextMenu.value!.$el
  const contextMenuWidth = menu.offsetWidth || 200
  const contextMenuHeight = menu.offsetHeight || 400

  if (canvas.width! - e.pointer!.x <= contextMenuWidth) {
    contextMenuPosition.value.x = canvas.width! - contextMenuWidth
  } else {
    contextMenuPosition.value.x = e.pointer!.x
  }
  if (canvas.height! - e.pointer!.y <= contextMenuHeight) {
    contextMenuPosition.value.y = canvas.height! - contextMenuHeight
  } else {
    contextMenuPosition.value.y = e.pointer!.y
  }
}

function canvasOnMouseDown(e: fabric.IEvent<MouseEvent>) {
  switch (e.button) {
    case 1:
      menuShow.value = false
      break
    case 3:
      initContextMenu(e)
      break

    default:
      break
  }
}

onMounted((): void => {
  // 初始化画布
  initCanvas()
  // 初始化控件
  initControls()

  // oncopy事件禁用复制;
  document.oncopy = onCopy
  // onpaste事件禁用粘贴
  document.onpaste = onPaste
  // oncut事件禁用剪切
  document.oncut = onCut
})
</script>
<template>
  <div class="h-full w-full overflow-hidden relative" ref="container">
    <canvas id="canvas"></canvas>
    <ContextMenu
      v-show="menuShow"
      ref="contextMenu"
      :menuList="menuList"
      :style="{
        top: contextMenuPosition.y + 'px',
        left: contextMenuPosition.x + 'px'
      }"
      class="context-menu"
    />
  </div>
</template>
<style lang="scss" scoped></style>
