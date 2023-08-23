class Grid {
  readonly rows: number
  readonly columns: number
  private htmlGrid: HTMLElement | null

  constructor(rows: number, columns: number, grid?: HTMLElement) {
    this.rows = rows
    this.columns = columns
    this.htmlGrid = grid ?? null
  }

  getGrid() {
    return this.htmlGrid
  }

  isOffLimit(x: number, y: number): boolean {
    return this.isOffWidth(x) || this.isOffHeight(y)
  }

  isOffWidth(x: number) {
    return x < 0 || x >= this.columns
  }

  isOffHeight(y: number) {
    return y < 0 || y >= this.rows
  }

  isEnd(x: number, y: number): boolean {
    if (y >= this.rows) return true
    const position = document.getElementById(`${x}-${y}`)

    if (position?.dataset.isBlocked === "true") return true

    return false
  }

  block(x: number, y: number) {
    const position = document.getElementById(`${x}-${y}`)
    if (position) position.dataset.isBlocked = "true"
    else throw new Error("Grid position is missing")
  }

  unblock(x: number, y: number) {
    const position = document.getElementById(`${x}-${y}`)
    if (position) position.dataset.isBlocked = "false"
    else throw new Error("Grid position is missing")
  }

  isBlocked(x: number, y: number): boolean {
    const position = document.getElementById(`${x}-${y}`)
    if (position?.dataset.isBlocked) return true

    return false
  }
}

export default Grid