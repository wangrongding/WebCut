import emitter, { BusEvent } from '~/utils/eventBus'

const keyCodeMap: Record<string, string> = {
  '8': 'Backspace',
  '27': 'Esc',
  '37': 'left',
  '38': 'top',
  '39': 'right',
  '40': 'bottom',
  '46': 'Delete',

  '48': '0',
  '49': '1',
  '50': '2',
  '51': '3',
  '52': '4',
  '53': '5',
  '54': '6',
  '55': '7',
  '56': '8',
  '57': '9',

  '65': 'A',
  '66': 'B',
  '67': 'C',
  '68': 'D',
  '69': 'E',
  '70': 'F',
  '71': 'G',
  '72': 'H',
  '73': 'I',
  '74': 'J',
  '75': 'K',
  '76': 'L',
  '77': 'M',
  '78': 'N',
  '79': 'O',
  '80': 'P',
  '81': 'Q',
  '82': 'R',
  '83': 'S',
  '84': 'T',
  '85': 'U',
  '86': 'V',
  '87': 'W',
  '88': 'X',
  '89': 'Y',
  '90': 'Z',

  '187': '+',
  '188': ',',
  '189': '-',
  '190': '.',
  '191': '/',
  '219': '[',
  '221': ']',
}
const keyEventMap: Record<
  string,
  (event: KeyboardEvent & { readonly target: HTMLElement }) => void
> = {
  // 全选
  'cmd&A': (event) => {
    event.preventDefault()
    emitter.emit(BusEvent.ElementSelectAll)
  },
  // 剪切
  'cmd&X': (event) => {
    event.preventDefault()
  },
  // 复制
  'cmd&C': (event) => {
    event.preventDefault()
    emitter.emit(BusEvent.ElementCopy)
  },
  // 粘贴
  'cmd&V': (event) => {
    event.preventDefault()
    emitter.emit(BusEvent.ElementPaste)
  },
  // 撤销 undo
  'cmd&Z': (event) => {
    event.preventDefault()
  },
  // 重做 redo
  'cmd&shift&Z': (event) => {
    event.preventDefault()
  },
  // 重做 redo
  'cmd&Y': (event) => {
    event.preventDefault()
  },
  // 保存
  'cmd&S': (event) => {
    event.preventDefault()
  },
  // 锁定/取消锁定
  'cmd&L': (event) => {
    if (event.shiftKey) return
    event.preventDefault()
  },
  // 上移一个图层
  'cmd&]': (event) => {},
  // 上移到顶层
  'cmd&alt&]': (event) => {},
  // 下移一个图层
  'cmd&[': (event) => {},
  // 下移到底层
  'cmd&alt&[': (event) => {},
  //  退格键删除
  Backspace: (event) => {
    event.preventDefault()
    emitter.emit(BusEvent.ElementDelete)
  },
  //  删除键删除
  Delete: (event) => {
    event.preventDefault()
    emitter.emit(BusEvent.ElementDelete)
  },
  // 元素恢复实际大小
  'shift&0': (event) => {},
  // 元素左右翻转
  'shift&H': (event) => {},
  // 元素上下翻转
  'shift&V': (event) => {},
  // 元素向左移动
  left: (event) => {},
  // 元素向右移动
  right: (event) => {},
  // 元素向上移动
  top: (event) => {},
  // 元素向下移动
  bottom: (event) => {},
}
// 找到对应的热键方法并执行
const findHotKeyFun = (event: KeyboardEvent & { optionKey?: boolean }) => {
  const keys: string[] = []
  if (event.metaKey || event.ctrlKey) {
    keys.push('cmd')
  }
  if (event.shiftKey) {
    keys.push('shift')
  }
  if (event.altKey || event.optionKey) {
    keys.push('alt')
  }
  keys.push(keyCodeMap[event.keyCode])
  const handler = keyEventMap[keys.join('&')]
  handler?.(event as KeyboardEvent & { target: HTMLElement })
}

// 快捷键绑定
export function registerHotkey() {
  window.addEventListener('keydown', findHotKeyFun, false)
}

// 快捷键解绑
export function unregisterHotkey() {
  window.removeEventListener('keydown', findHotKeyFun, false)
}
