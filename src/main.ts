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
  game.input(button)
}
document.addEventListener("keydown", keydownHandler)

const intervalCallback = () => {
  game.input("s")
}
setInterval(intervalCallback, 1000)
