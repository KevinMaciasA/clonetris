import Point from "../utils/Point";
import { colorPoint, ColorName } from "../utils/colorPoint";

abstract class Block {
  position: Point
  protected shape: Point[]
  protected color: ColorName

  constructor(initPosition: Point, shape: Point[], color: ColorName = "Black") {
    this.position = initPosition
    this.shape = shape
    this.color = color
  }

  draw() {
    this.shape.forEach((point) => {
      const p = this.position.add(point)
      colorPoint(this.color, p)
    })
  }

  clear() {
    this.shape.forEach((point) => {
      const p = this.position.add(point)
      colorPoint("White", p)
    })
  }

  //absolute movement
  absMove(position: Point) {
    this.clear()
    this.position = position
    this.draw()
  }
  // relative movement
  move(x: number, y: number) {
    this.clear()
    this.position.x += x
    this.position.y += y
    this.draw()
  }
}

export default Block