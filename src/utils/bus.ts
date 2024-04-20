import type { fabric } from 'fabric'
import mitt from 'mitt'
import type { Emitter } from 'mitt'

type Events = {
  'element:copy': void // 复制元素
  'element:paste': void // 粘贴元素
  'element:delete': fabric.Object // 删除元素
  // 添加元素
  'element:add': {
    // 元素类型 image | text | svg | gif | music
    type: 'video' | 'image' | 'text' | 'svg' | 'gif' | 'music'
    // 素材的 url 地址，如果是 text 类型则是文本内容
    value: string
  }
  'element:align': 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom' // 对齐方式
  'video:skip': number // 跳转视频
  'canvas:fullscreen'?: boolean // 全屏
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
