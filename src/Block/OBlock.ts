import Point from "../utils/Point";
import Block from "./Block";

class OBlock extends Block {
  constructor(x: number, y: number) {
    const shape = [
      new Point(0, 0), new Point(0, 1),
      new Point(1, 0), new Point(1, 1)
    ]
    super(new Point(x, y), shape, "Goldenrod")
  }

  override rotate(): void {
    //do nothing
  }
}

export default OBlock