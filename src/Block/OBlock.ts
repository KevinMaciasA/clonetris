import Block from "./Block";
import Point from "../utils/Point";
import { ColorName } from "../utils/colorPoint";

class OBlock extends Block {
  constructor(id: number, x: number, y: number) {
    const shape = [
      new Point(0, -1), new Point(1, -1),
      new Point(0, 0), new Point(1, 0)
    ]
    const color: ColorName = "Rice"
    super({ id, x, y, shape, color })
  }

  override rotate(): void {
    //do nothing
  }
}

export default OBlock