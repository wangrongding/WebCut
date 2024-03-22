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
  drawImage()
}

function drawImage() {
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
  // 绘制文字
  const text = new fabric.Text('开发中...', {
    left: 100,
    top: 100,
    fill: 'white',
    fontSize: 30
  })
  canvas.add(text)
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
