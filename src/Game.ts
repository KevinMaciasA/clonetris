import Dominos from "./Dominos/Dominos"
import Square from "./Dominos/Square"

class Game {
  private dominos: Dominos[]

  constructor() {
    this.dominos = [new Square(0, 0)]
  }

  move(x: number, y: number) {
    const last = this.dominos.at(-1)
    last?.move(x, y)
  }

  render() {
    this.dominos.forEach(domino => domino.draw())
  }
}

export default Game