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

let timeoutId: number;
const keydownHandler = (event: KeyboardEvent) => {
  const button = event.key

  if (button.toLocaleLowerCase() === "v")
    timeoutId = window.setTimeout(() => {
      game.reset()
    }, 2000)

  game.input(button)
}

document.addEventListener("keydown", keydownHandler)

const keyupHandler = (event: KeyboardEvent) => {
  const button = event.key

  if (button.toLocaleLowerCase() !== "v" || timeoutId === undefined) return

  clearTimeout(timeoutId)
}

document.addEventListener("keyup", keyupHandler)

const clickHandler = () => {
  game.run()
}

controlButton.addEventListener('click', clickHandler)

document.addEventListener("visibilitychange", () => {
  if (document.hidden) game.stop()
})

