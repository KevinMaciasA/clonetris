import Point from "../utils/Point";
import Dominos from "./Dominos";

class SBlock extends Dominos {
  constructor(x: number, y: number) {
    const shape = [
      /*S shape space*/ new Point(1, 0), new Point(2, 0),
      new Point(0, 1), new Point(1, 1)
    ]
    super(new Point(x, y), shape, "Teal")
  }

}

export default SBlock