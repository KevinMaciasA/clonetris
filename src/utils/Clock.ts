class Clock {
  private isRunning: boolean;
  private callback: () => void;
  private miliSeconds: number
  private intervalId: number | null;

  constructor(callback: () => void, ms: number) {
    this.isRunning = false
    this.callback = callback
    this.miliSeconds = ms
    this.intervalId = null;
  }

  start() {
    if (this.isRunning) return

    this.intervalId = window.setInterval(this.callback, this.miliSeconds)
    this.isRunning = true;
  }

  stop() {
    if (!this.isRunning || this.intervalId === null) return

    window.clearInterval(this.intervalId)
    this.isRunning = false;
  }

  reset() {
    if (!this.isRunning || this.intervalId === null) return

    window.clearInterval(this.intervalId)
    this.intervalId = window.setInterval(this.callback, this.miliSeconds)
  }

  change(ms: number) {
    if (!this.isRunning || this.intervalId === null) return

    window.clearInterval(this.intervalId)
    this.intervalId = window.setInterval(this.callback, ms)
  }

  pulse(ms: number) {
    this.change(ms)
    window.setTimeout(() => {
      this.change(this.miliSeconds)
    }, ms)
  }
}

export default Clock