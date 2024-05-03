interface GetThumbnailBySeekOptions {
  url: string // 视频地址
  interval: number // 间隔多少秒抽一帧
  clipStart?: number // 裁剪开始时间
  clipEnd?: number // 裁剪结束时间
}

// 通过 video + canvas 对视频进行抽帧
export async function getThumbnailBySeek(options: GetThumbnailBySeekOptions) {
  const { url, interval, clipStart, clipEnd } = options
  const video = document.createElement('video')
  video.src = url
  video.crossOrigin = 'anonymous' // 跨域, 防止污染
  video.preload = 'auto' // 不加会导致黑屏
  video.muted = true
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const thumbnails = []
  let clipDuration = 0
  if (clipEnd && clipStart) clipDuration = clipEnd - clipStart
  video.currentTime = clipStart || 0

  const generateThumbnail = () => {
    // currentTime = parseFloat(currentTime.toFixed(4))
    if (video.currentTime < video.duration) {
      // 间隔
      const gap = (clipDuration || video.duration) / interval
      // 跳转到指定时间，触发seeked事件
      video.currentTime += gap
    } else {
      video.removeEventListener('seeked', seekedHandler)
    }
  }

  const seekedHandler = () => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      thumbnails.push({ img: url, ts: video.currentTime })
      generateThumbnail()
    })
  }

  video.addEventListener('seeked', seekedHandler)
  video.addEventListener('loadeddata', async () => {
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    generateThumbnail()
  })
}

// 格式化时间
export function formatSeconds(seconds: number) {
  seconds = Math.floor(seconds)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`
  return formattedTime
}

// 补零
export function padZero(number: number) {
  return number.toString().padStart(2, '0')
}

// 事件禁用
export function disableEvent() {
  // 禁止右键菜单
  document.oncontextmenu = () => false
  // onselectstart事件禁用网页上选取的内容
  document.onselectstart = () => false
  // 禁止缩放
  document.addEventListener(
    'mousewheel',
    (event: Event) => {
      // 如果是ctrl + 滚轮，阻止默认事件
      if ((event as WheelEvent).ctrlKey) event.preventDefault()
    },
    {
      capture: false, // 是否在捕获阶段执行
      passive: false, // 是否是一个被动的监听器
    },
  )

  // 禁用浏览器ctrl +- 缩放
  const keyCodeMap = [
    91, // command
    61,
    107, // 数字键盘 +
    109, // 数字键盘 -
    173, // 火狐 - 号
    187, // +
    189, // -
  ]
  // 覆盖ctrl||command + ‘+’/‘-’
  document.onkeydown = function (event) {
    const e = event || window.event
    const ctrlKey = e.ctrlKey || e.metaKey
    const keyCode = e.keyCode || e.which || e.charCode
    if (ctrlKey && keyCode in keyCodeMap) {
      e.preventDefault()
    }
  }
}
