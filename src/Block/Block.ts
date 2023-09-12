import Point from "../utils/Point";
import { addCustomAttr } from "../utils/addCustomAttr";
import { colorPoint, ColorName } from "../utils/colorPoint";

type blockParams = {
  id: number,
  x: number,
  y: number,
  shape: Point[],
  color: ColorName
}

abstract class Block {
  protected id: number
  protected shape: Point[]
  protected color: ColorName
  point: Point

  // initPosition: Point, shape: Point[], color: ColorName = "Black"
  constructor({ id, x, y, shape, color = 'Black' }: blockParams) {
    this.id = id
    this.point = new Point(x, y)
    this.shape = shape
    this.color = color
  }

  get _id() {
    return this.id
  }

  draw() {
    this.shape.forEach((point) => {
      const p = this.point.add(point)
      colorPoint(this.color, p)
      addCustomAttr("id", this.id, p)
      addCustomAttr("isBlocked", true, p)
    })
  }

  clear() {
    this.shape.forEach((point) => {
      const p = this.point.add(point)
      colorPoint("Default", p)
      addCustomAttr("id", null, p)
      addCustomAttr("isBlocked", false, p)
    })
  }

  doAndRedraw(callback: () => void) {
    this.clear()
    callback()
    this.draw()
  }

  //absolute movement
  absMove(position: Point) {
    this.doAndRedraw(() => this.point = position)
  }
  // relative movement
  move(x: number, y: number) {
    this.doAndRedraw(() => {
      this.point.x += x
      this.point.y += y
    })
  }

  position(): Point[] {
    return this.shape.map(point => this.point.add(point))
  }

  previewMove(x: number, y: number): Point[] {
    const newPosition = this.point.add(new Point(x, y))
    return this.shape.map(point => newPosition.add(point))
  }

  previewAbsMove(point: Point): Point[] {
    return this.shape.map(p => point.add(p))
  }

  rotate() {
    this.doAndRedraw(() => this.shape.forEach(point => point.rotate()))
  }

  deleteFromShape(point: Point) {
    this.doAndRedraw(() => this.shape = this.shape.filter(p => !p.equal(point)))
  }

  deleteAllYFromShape(y: number) {
    const handleDelete = () => {
      const toDeleteY = y - this.point.y
      const result: Point[] = []
      for (const point of this.shape) {
        if (point.y === toDeleteY) continue

        if (point.y < toDeleteY)
          point.y += 1

        result.push(point)
      }
      this.shape = result
    }
    this.doAndRedraw(handleDelete)
  }

  hasShape(): boolean {
    return this.shape.length > 0
  }
}

export default Block