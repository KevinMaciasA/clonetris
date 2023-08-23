import Point from "../utils/Point";
import Block from "./Block";

class LBlock extends Block {
  constructor(x: number, y: number) {
    const shape = [
      /* ------ L shape space ----- */ new Point(1, -1),
      new Point(-1, 0), new Point(0, 0), new Point(1, 0)
    ]
    super(new Point(x, y), shape, "ForestGreen")
  }

}

export default LBlock