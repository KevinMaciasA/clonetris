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
    return this.x === point.x && this.y === point.y
  }
}

export default Point;