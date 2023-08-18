import Dominos from "./Dominos/Dominos"
import Square from "./Dominos/Square"

class Game {
  private dominos: Dominos[]
  private moveSet: Map<string, () => void>

  constructor() {
    this.dominos = [new Square(0, 0)]
    this.moveSet = new Map([
      ["w", this.moveTop.bind(this)],
      ["s", this.moveBot.bind(this)],
      ["a", this.moveLeft.bind(this)],
      ["d", this.moveRight.bind(this)],
    ])
  }

  private move(x: number, y: number) {
    const last = this.dominos.at(-1)
    last?.move(x, y)
  }

  private moveTop() {
    this.move(0, -1)
  }

  private moveBot() {
    this.move(0, 1)
  }

  private moveLeft() {
    this.move(-1, 0)
  }

  private moveRight() {
    this.move(1, 0)
  }

  input(button: string) {
    const fun = this.moveSet.get(button)
    if (fun) fun()
  }

  render() {
    this.dominos.forEach(domino => domino.draw())
  }
}

export default Game