import Block from "./Block/Block"
import Grid from "./Grid"
import { IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock } from "./Block"
import { randomNumber } from "./utils/randomNumber"
import Point from "./utils/Point"


// TODO: technical debt: -optimize re-render & collisions
class Game {
  private stack: Block[]
  private blocksLeft: Block[]
  private blocks: Array<() => Block>
  private moveSet: Map<string, () => void>
  private grid: Grid

  constructor(grid: Grid) {
    this.grid = grid
    const half = Math.round(this.grid.columns / 4)
    this.blocks = [
      () => new IBlock(half, 0),
      () => new JBlock(half, 0),
      () => new LBlock(half, 0),
      () => new OBlock(half, 0),
      () => new ZBlock(half, 0),
      () => new TBlock(half, 0),
      () => new SBlock(half, 0)
    ]
    this.blocksLeft = this.newStack()
    const firstBlock = this.blocksLeft.pop()
    this.stack = [firstBlock ?? new LBlock(half, 0)]
    this.moveSet = new Map([
      ["w", this.moveTop.bind(this)],
      ["s", this.moveBot.bind(this)],
      ["a", this.moveLeft.bind(this)],
      ["d", this.moveRight.bind(this)],
      ["r", this.rotate.bind(this)]
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
      if (dominoFactory) return dominoFactory()

      return new OBlock(0, 0)
    })
  }

  private nextBlock() {
    if (this.blocksLeft.length === 0) {
      this.blocksLeft = this.newStack()
    } else {
      const next = this.blocksLeft.pop()
      if (next) this.stack.push(next)
    }

  }

  private move(block: Block, x: number, y: number) {
    block.move(x, y)
  }

  private moveCurrent(x: number, y: number) {
    const last = this.stack.at(-1)

    if (!last) return

    last.move(x, y)
  }

  // Hard Drop
  private moveTop() {
    let current = new Point(0, 1)
    let past = new Point(0, 0)
    while (!this.isEnd(current.x, current.y)) {
      past = current
      current = current.add(new Point(0, 1));
    }
    this.moveCurrent(0, past.y)
  }

  // Soft Drop
  private moveBot() {
    const relX = 0
    const relY = 1
    if (!this.isEnd(relX, relY)) return this.moveCurrent(0, 1)

    this.nextBlock()
  }

  private moveLeft() {
    const relX = -1
    const relY = 0
    if (!this.isOff(relX, relY)) this.moveCurrent(relX, relY)
  }

  private moveRight() {
    const relX = 1
    const relY = 0
    if (!this.isOff(relX, relY)) this.moveCurrent(relX, relY)
  }

  private rotate() {
    const last = this.stack.at(-1)

    if (!last) return

    last.rotate()
  }

  private currentPreviewMove(x: number, y: number): Point[] {
    const last = this.stack.at(-1)

    if (!last) throw new Error("Block stack is empty")

    const current = last.position();
    const preview = last.previewMove(x, y)

    //prevent auto colision
    const points = preview.filter(pointA => !current.some(pointB => pointA.equal(pointB)))
    return points
  }

  private isEnd(x: number, y: number) {
    const newPosition = this.currentPreviewMove(x, y)

    const isEnd = newPosition.some(point => this.grid.yCollision(point.x, point.y))
    return isEnd
  }

  private isOff(x: number, y: number) {
    const newPosition = this.currentPreviewMove(x, y)

    const isOff = newPosition.some(point => this.grid.xCollision(point.x, point.y))
    return isOff
  }

  input(button: string) {
    const fun = this.moveSet.get(button)
    if (fun) fun()
  }

  render() {
    this.stack.forEach(domino => domino.draw())
  }
}

export default Game