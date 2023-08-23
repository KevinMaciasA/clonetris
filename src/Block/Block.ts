import Point from "../utils/Point";
import { addCustomAttr } from "../utils/addCustomAttr";
import { colorPoint, ColorName } from "../utils/colorPoint";

abstract class Block {
  point: Point
  protected shape: Point[]
  protected color: ColorName

  constructor(initPosition: Point, shape: Point[], color: ColorName = "Black") {
    this.point = initPosition
    this.shape = shape
    this.color = color
  }

  draw() {
    this.shape.forEach((point) => {
      const p = this.point.add(point)
      colorPoint(this.color, p)
      addCustomAttr("isBlocked", true, p)
    })
  }

  clear() {
    this.shape.forEach((point) => {
      const p = this.point.add(point)
      colorPoint("White", p)
      addCustomAttr("isBlocked", false, p)
    })
  }

  //absolute movement
  absMove(position: Point) {
    this.clear()
    this.point = position
    this.draw()
  }
  // relative movement
  move(x: number, y: number) {
    this.clear()
    this.point.x += x
    this.point.y += y
    this.draw()
  }

  position(): Point[] {
    return this.shape.map(point => this.point.add(point))
  }

  previewMove(x: number, y: number): Point[] {
    const newPosition = this.point.add(new Point(x, y))
    return this.shape.map(point => newPosition.add(point))
  }
}

export default Block