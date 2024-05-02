import type { fabric } from 'fabric'
import mitt from 'mitt'
import type { Emitter } from 'mitt'

export enum BusEvent {
  ElementCopy = 'element:copy',
  ElementPaste = 'element:paste',
  ElementDelete = 'element:delete',
  ElementAdd = 'element:add',
  ElementAlign = 'element:align',
  ElementFlip = 'element:flip',
  ElementLayer = 'element:layer',
  VideoSkip = 'video:skip',
  CanvasExportCurrentFrame = 'canvas:export-current-frame',
  CanvasFullScreen = 'canvas:fullscreen'
}

type BusEvents = {
  // ============================= element =============================
  // 复制元素
  [BusEvent.ElementCopy]: void
  // 粘贴元素
  [BusEvent.ElementPaste]: void
  // 删除元素
  [BusEvent.ElementDelete]: fabric.Object
  // 添加元素
  [BusEvent.ElementAdd]: {
    // 元素类型 image | text | svg | gif | music
    type: 'video' | 'image' | 'text' | 'svg' | 'gif' | 'music'
    // 素材的 url 地址，如果是 text 类型则是文本内容
    value: string
  }
  // 元素对齐方式
  [BusEvent.ElementAlign]: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'
  // 翻转
  [BusEvent.ElementFlip]: 'x' | 'y'
  // 元素层级
  [BusEvent.ElementLayer]: 'up' | 'down' | 'top' | 'bottom'
  // ============================= video =============================
  // 视频跳转
  [BusEvent.VideoSkip]: number
  // ============================= canvas =============================
  // 导出当前帧
  [BusEvent.CanvasExportCurrentFrame]: void
  // 全屏
  [BusEvent.CanvasFullScreen]: boolean
}

const emitter: Emitter<BusEvents> = mitt<BusEvents>()

export default emitter
