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
