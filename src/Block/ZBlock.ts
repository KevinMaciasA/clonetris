import Block from "./Block";
import Point from "../utils/Point";
import { ColorName } from "../utils/colorPoint";

class ZBlock extends Block {
  constructor(id: number, x: number, y: number) {
    const shape = [
      new Point(-1, -1), new Point(0, -1),
      /* z shape space */ new Point(0, 0), new Point(1, 0)
    ]
    const color: ColorName = "Yellow"
    super({ id, x, y, shape, color })
  }

}

export default ZBlock