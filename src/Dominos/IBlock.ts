import Point from "../utils/Point";
import Dominos from "./Dominos";

class IBlock extends Dominos {
  constructor(x: number, y: number) {
    const shape = [
      new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(3, 0)
    ]
    super(new Point(x, y), shape, "RoyalBlue")
  }

}

export default IBlock