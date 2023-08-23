import Game from './Game'
import Grid from './Grid'
import populateGrid from './populateGrid'
import './style.css'

const columns = 10
const rows = 20

const htmlGrid = document.getElementById("game-grid")
if (!htmlGrid) throw new Error("Grid is missing")
populateGrid(htmlGrid, rows, columns)

const grid = new Grid(rows, columns, htmlGrid)

const game = new Game(grid)
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
