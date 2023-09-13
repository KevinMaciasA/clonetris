class Interval {
  private callback: () => void;
  private miliSeconds: number
  private intervalId: number;

  constructor(callback: () => void, ms: number) {
    this.callback = callback
    this.miliSeconds = ms
    this.intervalId = window.setInterval(this.callback, this.miliSeconds)
  }

  reset() {
    window.clearInterval(this.intervalId)
    this.intervalId = window.setInterval(this.callback, this.miliSeconds)
  }

  change(ms: number) {
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

export default Interval