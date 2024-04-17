import type { fabric } from 'fabric'
import mitt from 'mitt'
import type { Emitter } from 'mitt'

type Events = {
  'element:copy': void // 复制元素
  'element:paste': void // 粘贴元素
  'element:delete': fabric.Object // 删除元素
  'video:skip': number // 跳转视频
  'canvas:fullscreen'?: boolean // 全屏
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
