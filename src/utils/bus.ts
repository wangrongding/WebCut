import type { fabric } from 'fabric'
import mitt from 'mitt'
import type { Emitter } from 'mitt'

type Events = {
  // 复制元素
  'element:copy': void
  // 粘贴元素
  'element:paste': void
  // 删除元素
  'element:delete': fabric.Object
  // 添加元素
  'element:add': {
    // 元素类型 image | text | svg | gif | music
    type: 'video' | 'image' | 'text' | 'svg' | 'gif' | 'music'
    // 素材的 url 地址，如果是 text 类型则是文本内容
    value: string
  }
  // 元素对齐方式
  'element:align': 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'
  // 翻转
  'element:flip': 'x' | 'y'
  // 元素层级
  'element:layer': 'up' | 'down' | 'top' | 'bottom'
  // 跳转视频
  'video:skip': number
  // 全屏
  'canvas:fullscreen'?: boolean
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
