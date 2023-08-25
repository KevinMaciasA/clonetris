class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y)
  }

  equal(point: Point) {
    return this.equalX(point.x) && this.equalY(point.y)
  }

  private equalX(x: number) {
    return this.x === x
  }

  equalY(y: number) {
    return this.y === y
  }

  swap() {
    const x = this.x
    const y = this.y
    this.y = x
    this.x = y
  }

  rotate() {
    this.x *= -1
    this.swap()
  }
}

export default Point;