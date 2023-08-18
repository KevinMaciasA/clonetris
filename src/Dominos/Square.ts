import Point from "../utils/Point";
import Dominos from "./Dominos";

class Square extends Dominos {
  constructor(x: number, y: number) {
    const shape = [
      new Point(0, 0), new Point(0, 1),
      new Point(1, 0), new Point(1, 1)
    ]
    super(new Point(x, y), shape)
  }

}

export default Square