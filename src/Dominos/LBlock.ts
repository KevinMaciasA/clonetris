import Point from "../utils/Point";
import Dominos from "./Dominos";

class LBlock extends Dominos {
  constructor(x: number, y: number) {
    const shape = [
      /* ------ L shape space ----- */ new Point(2, 0),
      new Point(0, 1), new Point(1, 1), new Point(2, 1)
    ]
    super(new Point(x, y), shape, "ForestGreen")
  }

}

export default LBlock