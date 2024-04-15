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
  // video.src = 'https://assets.fedtop.com/picbed/movie.mp4'
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

export function formatSeconds(seconds: number) {
  seconds = Math.floor(seconds)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`
  return formattedTime
}

export function padZero(number: number) {
  return number.toString().padStart(2, '0')
}
