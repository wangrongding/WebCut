import type { fabric } from 'fabric'
import mitt from 'mitt'
import type { Emitter } from 'mitt'

type Events = {
  'element:copy': void // 复制元素
  'element:paste': void // 粘贴元素
  'element:delete': fabric.Object // 删除元素
  // 添加元素
  'element:add': {
    value: string // 图片地址 url | 视频地址 url | 文本内容 | SVG ...
    type: string // 元素类型
  }
  'element:align': 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom' // 对齐方式
  'video:skip': number // 跳转视频
  'canvas:fullscreen'?: boolean // 全屏
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
