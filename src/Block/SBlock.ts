import Block from "./Block";
import Point from "../utils/Point";
import { ColorName } from "../utils/colorPoint";

class SBlock extends Block {
  constructor(id: number, x: number, y: number) {
    const shape = [
      /*S shape space*/ new Point(0, -1), new Point(1, -1),
      new Point(-1, 0), new Point(0, 0)
    ]
    const color: ColorName = "Teal"
    super({ id, x, y, shape, color })
  }

}

export default SBlock