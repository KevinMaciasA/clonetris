import Game from './Game'
import populateGrid from './populateGrid'
import './style.css'

const grid = document.getElementById("game-grid")
if (!grid) throw new Error("Grid is missing")
populateGrid(grid)

const game = new Game()
game.render()

const keydownHandler = (event: KeyboardEvent) => {
  const button = event.key
  console.log(button)
  if (button === "s") {
    game.move(0, 1)
  }
}
document.addEventListener("keydown", keydownHandler)
