import Point from "../utils/Point";
import Block from "./Block";

class TBlock extends Block {
  constructor(x: number, y: number) {
    const shape = [
      /*T shape space*/ new Point(0, -1),
      new Point(-1, 0), new Point(0, 0), new Point(1, 0)
    ]
    super(new Point(x, y), shape, "Indigo")
  }

}

export default TBlock