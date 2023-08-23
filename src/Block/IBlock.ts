import Point from "../utils/Point";
import Block from "./Block";

class IBlock extends Block {
  constructor(x: number, y: number) {
    const shape = [
      new Point(-2, 0), new Point(-1, 0), new Point(0, 0), new Point(1, 0)
    ]
    super(new Point(x, y), shape, "RoyalBlue")
  }

}

export default IBlock