import Button from './Button'
import Game from './Game'
import Grid from './Grid'
import './style.css'

const columns = 10
const rows = 20

const htmlGrid = document.getElementById("game-grid")
if (!htmlGrid) throw new Error("Grid is missing")

const grid = new Grid(rows, columns, htmlGrid)

const controlButton = document.getElementById("play-button")
if (!controlButton) throw new Error("Play button is missing")

const game = new Game(grid, new Button(controlButton))

const keydownHandler = (event: KeyboardEvent) => {
  const button = event.key
  game.input(button)
}

document.addEventListener("keydown", keydownHandler)

const clickHandler = () => {
  game.start()
}

controlButton.addEventListener('click', clickHandler)

document.addEventListener("visibilitychange", () => {
  if (document.hidden) game.stop()
})