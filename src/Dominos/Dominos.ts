import Point from "../utils/Point";
import colorPoint from "../utils/colorPoint";

abstract class Dominos {
  position: Point
  protected shape: Point[]

  constructor(initPosition: Point, shape: Point[]) {
    this.position = initPosition
    this.shape = shape;
  }

  draw() {
    this.shape.forEach((point) => {
      const p = this.position.add(point)
      colorPoint("crimson", p)
    })
  }

  clear() {
    this.shape.forEach((point) => {
      const p = this.position.add(point)
      colorPoint("white", p)
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

export default Dominos