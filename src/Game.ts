import Block from "./Block/Block"
import Grid from "./Grid"
import { IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock } from "./Block"
import { randomNumber } from "./utils/randomNumber"
import Point from "./utils/Point"
import Clock from "./utils/Clock"
import Button from "./Button"

class Game {
  private index: number
  private stack: Block[]
  private blocksLeft: Block[]
  private blocks: Array<(id: number) => Block>
  private moveSet: Map<string, () => void>
  private grid: Grid
  private clock: Clock;
  private controlButton: Button
  private isRunning: boolean;

  constructor(grid: Grid, controlButton: Button) {
    this.controlButton = controlButton
    this.grid = grid
    this.isRunning = false
    this.index = 0
    const half = Math.round(this.grid.columns / 4)
    this.blocks = [
      (id: number) => new IBlock(id, half, 0),
      (id: number) => new JBlock(id, half, 0),
      (id: number) => new LBlock(id, half, 0),
      (id: number) => new OBlock(id, half, 0),
      (id: number) => new ZBlock(id, half, 0),
      (id: number) => new TBlock(id, half, 0),
      (id: number) => new SBlock(id, half, 0)
    ]
    this.blocksLeft = this.newStack()
    const firstBlock = this.blocksLeft.shift()

    if (!firstBlock) throw new Error("Problem generating new stack of Blocks")

    this.stack = [firstBlock]

    // set auto drop
    const miliSeconds = 1000
    this.clock = new Clock(this.moveBot.bind(this), miliSeconds)

    this.moveSet = new Map([
      ["w", this.moveTop.bind(this)],
      ["s", this.moveBot.bind(this)],
      ["a", this.moveLeft.bind(this)],
      ["d", this.moveRight.bind(this)],
      ["r", this.rotateCurrent.bind(this)],
    ])
  }

  private newStack(): Block[] {
    const newStack: number[] = []
    const unselected = Array.from(this.blocks, (_, i) => i)
    for (let i = 0; i <= this.blocks.length; i++) {
      const random = randomNumber(0, unselected.length - 1)
      const deleted = unselected.splice(random, 1)
      newStack.push(...deleted)
    }
    return newStack.map(index => {
      const dominoFactory = this.blocks.at(index)
      if (dominoFactory) return dominoFactory(this.index++)

      return new OBlock(this.index++, 0, 0)
    })
  }

  private nextBlock() {
    if (this.blocksLeft.length === 0) {
      this.blocksLeft = this.newStack()
    } else {
      const next = this.blocksLeft.shift()
      if (next) this.stack.push(next)
    }

  }

  private move(block: Block, point: Point) {
    block.absMove(point)
  }

  private moveCurrent(x: number, y: number) {
    const last = this.stack.at(-1)

    if (!last) return

    const moveInX = x !== 0
    const moveInY = y !== 0

    const preview = last.previewMove(x, y)

    last.clear() //to prevente auto-collisions
    if (moveInX) {
      if (!this.isAnyOff(preview)) return last.move(x, y)

      last.draw()
    } else if (moveInY) {
      if (!this.isAnyEnd(preview)) return last.move(x, y)

      last.draw()
      this.handleRowFull()
      this.nextBlock()
    }
  }

  private goTillEnd(block: Block) {
    let current = block.point.add(new Point(0, 1))
    let past = block.point
    block.clear()
    while (!this.isAnyEnd(block.previewAbsMove(current))) {
      past = current
      current = current.add(new Point(0, 1));
    }
    block.draw()
    this.move(block, past)
  }

  // Hard Drop
  private moveTop() {
    const last = this.stack.at(-1)

    if (!last) return

    this.goTillEnd(last)
    this.clock.pulse(500)
  }

  // Soft Drop
  private moveBot() {
    const relX = 0
    const relY = 1

    this.moveCurrent(relX, relY)
    this.clock.reset() // reset auto drop
  }

  private moveLeft() {
    const relX = -1
    const relY = 0

    this.moveCurrent(relX, relY)
  }

  private moveRight() {
    const relX = 1
    const relY = 0

    this.moveCurrent(relX, relY)
  }

  private rotateCurrent() {
    const last = this.stack.at(-1)

    if (!last) return

    this.rotate(last)
  }

  private rotate(block: Block) {
    block.rotate()
  }

  private isOff(point: Point): boolean {
    return this.grid.xCollision(point.x, point.y)
  }

  private isAnyOff(points: Point[]): boolean {
    return points.some(point => this.isOff(point))
  }

  private isEnd(point: Point) {
    return this.grid.yCollision(point.x, point.y)
  }

  private isAnyEnd(points: Point[]) {
    return points.some(point => this.isEnd(point))
  }

  private handleRowFull() {
    const last = this.stack.at(-1)

    if (!last) return

    const position = last.position()

    const rows = position
      .map(point => point.y)
      .reduce((uniques, row): number[] => !uniques.includes(row) ? [...uniques, row] : uniques, new Array<number>())

    const rowsFull: number[] = rows.filter(row => this.grid.isRowFull(row))
    if (rowsFull.length === 0) return

    rowsFull.forEach(row => this.clearRow(row))

    this.stack.forEach(block => this.goTillEnd(block))
  }

  private clearRow(row: number) {
    const dataIds = this.grid.getDataIdsIn(row)
    dataIds.forEach(id => {
      const block = this.stack.find(block => block._id === id)

      if (!block) return

      block.deleteAllYFromShape(row)
      // this part is still not tested
      if (!block.hasShape()) this.remove(block)
    })
  }

  private remove(block: Block) {
    this.stack = this.stack.filter(b => b !== block)
  }

  input(button: string) {
    if (this.isRunning) {
      const fun = this.moveSet.get(button)
      if (fun) fun()
    } else {
      if (button === "v") this.start()
    }
  }

  start() {
    this.render()
    this.clock.start()
    this.controlButton.hide()
    this.isRunning = true
  }

  stop() {
    this.clock.stop()
    this.controlButton.show()
    this.isRunning = false
  }

  reset() {
    this.stop()
    this.clear()

    this.blocksLeft = this.newStack()
    const firstBlock = this.blocksLeft.shift()

    if (!firstBlock) throw new Error("Problem generating new stack of Blocks")

    this.stack = [firstBlock]

    // set auto drop
    const miliSeconds = 1000
    this.clock = new Clock(this.moveBot.bind(this), miliSeconds)
  }

  private render() {
    this.stack.forEach(domino => domino.draw())
  }

  private clear() {
    this.stack.forEach(domino => domino.clear())
  }
}

export default Game