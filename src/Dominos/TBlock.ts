import Point from "../utils/Point";
import Dominos from "./Dominos";

class TBlock extends Dominos {
  constructor(x: number, y: number) {
    const shape = [
      /*T shape space*/ new Point(1, 0),
      new Point(0, 1), new Point(1, 1), new Point(2, 1)
    ]
    super(new Point(x, y), shape, "Indigo")
  }

}

export default TBlock