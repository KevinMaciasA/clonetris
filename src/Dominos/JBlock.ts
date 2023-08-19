import Point from "../utils/Point";
import Dominos from "./Dominos";

class JBlock extends Dominos {
  constructor(x: number, y: number) {
    const shape = [
      new Point(0, 0),
      new Point(0, 1), new Point(1, 1), new Point(2, 1)
    ]
    super(new Point(x, y), shape, "Crimson")
  }

}

export default JBlock