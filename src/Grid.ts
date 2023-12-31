class Grid {
  readonly rows: number
  readonly columns: number
  private htmlGrid: HTMLElement

  constructor(rows: number, columns: number, grid: HTMLElement) {
    this.rows = rows
    this.columns = columns
    this.htmlGrid = grid
    this.populate()
  }

  private populate() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const div = document.createElement("div")
        div.classList.add("grid-item")
        div.dataset.isBlocked = "false"
        div.id = `${j}-${i}`
        this.htmlGrid.appendChild(div)
      }
    }
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

  //horizontal colition
  xCollision(x: number, y: number) {
    if (this.isOffWidth(x)) return true

    const position = document.getElementById(`${x}-${y}`)

    if (position?.dataset.isBlocked === "true") return true

    return false
  }

  isOffHeight(y: number) {
    return y < 0 || y >= this.rows
  }

  yCollision(x: number, y: number): boolean {
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
    if (position?.dataset.isBlocked === "true") return true

    return false
  }

  isRowFull(y: number) {
    for (let x = 0; x < this.columns; x++) {
      const position = document.getElementById(`${x}-${y}`)
      if (position?.dataset.isBlocked === "false") return false
    }

    return true
  }

  getDataIdsIn(y: number): Set<number> {
    const set: Set<number> = new Set()
    for (let x = 0; x < this.columns; x++) {
      const position = document.getElementById(`${x}-${y}`)
      const dataId = position?.dataset.id

      if (!dataId || dataId === "null") continue

      set.add(parseInt(dataId))
    }
    return set
  }
}

export default Grid