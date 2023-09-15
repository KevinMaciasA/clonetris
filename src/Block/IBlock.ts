import Block from "./Block";
import Point from "../utils/Point";
import { ColorName } from "../utils/colorPoint";

class IBlock extends Block {
  constructor(id: number, x: number, y: number) {
    const shape = [
      new Point(-1, 0), new Point(0, 0), new Point(1, 0), new Point(2, 0)
    ]
    const color: ColorName = "Blue"
    super({ id, x, y, shape, color })
  }

}

export default IBlock