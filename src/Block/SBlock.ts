import Point from "../utils/Point";
import Block from "./Block";

class SBlock extends Block {
  constructor(x: number, y: number) {
    const shape = [
      /*S shape space*/ new Point(0, -1), new Point(1, -1),
      new Point(-1, 0), new Point(0, 0)
    ]
    super(new Point(x, y), shape, "Teal")
  }

}

export default SBlock