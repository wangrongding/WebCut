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
const { playStatus, currentTime, duration } = storeToRefs(playerStore)
const menuShow = ref(false)
const contextMenuPosition = ref({ x: 0, y: 0 })
const contextMenu = ref<typeof ContextMenu | null>(null)
let canvas: fabric.Canvas
let ctx: CanvasRenderingContext2D
let clipboard: fabric.Object | null = null

const menuList = [
  { key: 'flipX', shortkey: '⌘+C', text: '复制', callback: onCopy },
  { key: 'flipX', shortkey: '⌘+V', text: '粘贴', callback: onPaste },
  { key: 'flipX', shortkey: 'Del', text: '删除', callback: onDelete },
  { key: 'flipY', shortkey: '⌘+]', text: '上移一层', callback: () => setElementLayer('up') },
  { key: 'flipY', shortkey: '⌘+[', text: '下移一层', callback: () => setElementLayer('down') },
  { key: 'flipY', shortkey: '', text: '置于顶层', callback: () => {} },
  { key: 'flipY', shortkey: '', text: '置于底层', callback: () => {} },
  { key: 'flipX', shortkey: '', text: '旋转90°', callback: rotate },
  { key: 'flipX', shortkey: '', text: '左右翻转', callback: () => flip('x') },
  { key: 'flipY', shortkey: '', text: '垂直翻转', callback: () => flip('y') }
]

emitter.on('element:copy', onCopy)
emitter.on('element:paste', onPaste)
emitter.on('element:delete', onDelete)
watch(playStatus, (v) => video[v ? 'play' : 'pause']())

// 初始化画布
function initCanvas() {
  canvas = new fabric.Canvas('canvas', {
    fireRightClick: true, // 启用右键，button的数字为 3
    stopContextMenu: true, // 禁止默认右键菜单
    selection: true, // 是否开启选择
    hoverCursor: 'pointer', // 鼠标悬停时的样式
    preserveObjectStacking: true, // 保持对象的堆叠顺序(选中时不会置顶)
    backgroundColor: '#000' // 画布背景色
  })
  ctx = canvas.getContext()
  resizePlayer()
  initCanvasEvent()
  drawElements()
}

// 初始化 Canvas 事件
function initCanvasEvent() {
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
}

// 绘制元素
async function drawElements() {
  await drawVideo(movie)
  addSVG(Logo)
  addText('开发中...')
  canvas.renderAll()
}

// 删除元素
// BUG 为啥删不了
function onDelete(obj: fabric.Object) {
  const activeObject = obj || canvas.getActiveObject()
  if (!activeObject) return
  canvas.remove(activeObject)
  canvas.requestRenderAll()
  menuShow.value = false
}

// 绘制 svg
function addSVG(url: string) {
  fabric.loadSVGFromURL(url, (objects, options) => {
    const obj = fabric.util.groupSVGElements(objects, options)
    obj.set({
      scaleX: 8,
      scaleY: 8,
      left: canvas.width! / 2 - (obj.width! * 5) / 2,
      top: canvas.height! / 2 - (obj.height! * 5) / 2,
      angle: 0
    })
    canvas.add(obj)
  })
}

// 添加文字
function addText(text: string) {
  const textElement = new fabric.Textbox(text, {
    left: canvas.width! / 2,
    top: canvas.height! / 2,
    fill: 'white',
    fontSize: 20
  })
  canvas.add(textElement)
}

// 绘制视频
// TODO 需要实现通过 webcodecs 进行视频解码后绘制
async function drawVideo(url: string) {
  video = document.createElement('video')
  video.src = url
  video.loop = true
  video.preload = 'auto' // 不加会导致未播放时元素黑屏

  await new Promise<void>((resolve) => {
    video.addEventListener('loadedmetadata', () => {
      // 视频源宽高
      video.width = video.videoWidth
      video.height = video.videoHeight
      resolve()
    })
  })

  const videoWidth = video.width
  const videoHeight = video.height
  const canvasWidth = canvas.width!
  const canvasHeight = canvas.height!
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
  duration.value = video.duration

  video.addEventListener('timeupdate', () => {
    currentTime.value = video.currentTime
  })
}

// 持续重绘
function continuouslyRepaint() {
  canvas.renderAll()
  fabric.util.requestAnimFrame(continuouslyRepaint)
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
function setElementLayer(type: 'up' | 'down' | 'top' | 'bottom') {
  const activeObject = canvas.getActiveObject()
  if (!activeObject) return
  switch (type) {
    case 'up':
      // 上移一层
      canvas.bringForward(activeObject)
      break
    case 'down':
      // 下移一层
      canvas.sendBackwards(activeObject)
      break
    case 'top':
      // 置于顶层
      canvas.bringToFront(activeObject)
      break
    case 'bottom':
      // 置于底层
      canvas.sendToBack(activeObject)
      break
    default:
      break
  }
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

// 以元素的中心旋转 90°
// BUG 未拖动元素时，旋转会导致元素偏移
function rotate() {
  const activeObject = canvas.getActiveObject()
  if (!activeObject) return
  activeObject.set({
    angle: activeObject.angle! + 90,
    originX: 'center',
    originY: 'center'
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

/**
 * 需要在初始化时，设置 fireMiddleClick: true
 * 左键：button 的值为 1
 * 中键（也就是点击滚轮），button 的值为 2
 * 右键：button 的值为 3
 */
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
