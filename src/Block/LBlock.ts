import Block from "./Block";
import Point from "../utils/Point";
import { ColorName } from "../utils/colorPoint";

class LBlock extends Block {
  constructor(id: number, x: number, y: number) {
    const shape = [
      /* ------ L shape space ----- */ new Point(1, -1),
      new Point(-1, 0), new Point(0, 0), new Point(1, 0)
    ]
    const color: ColorName = "ForestGreen"
    super({ id, x, y, shape, color })
  }

}

export default LBlock