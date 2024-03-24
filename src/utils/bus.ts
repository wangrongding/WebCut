export default class EventBus {
  listeners: Record<string, Function[]>

  constructor() {
    this.listeners = {}
  }

  on(eventName: string, callback: Function) {
    if (!this.listeners[eventName]) this.listeners[eventName] = []
    this.listeners[eventName].push(callback)
  }

  off(eventName: string, callback: Function) {
    if (!this.listeners[eventName]) throw new Error(`Can't find event: ${eventName}`)

    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== callback
    )
  }

  emit(eventName: string, ...args: any[]) {
    if (!this.listeners[eventName]) throw new Error(`Can't find event: ${eventName}`)

    this.listeners[eventName].forEach((fn) => {
      fn(...args)
    })
  }
}
