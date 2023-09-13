import Game from './Game'
import Grid from './Grid'
import populateGrid from './populateGrid'
import './style.css'
import Interval from './utils/Interval'
import { hideComponent } from './utils/hideComponent'

const columns = 10
const rows = 20

const htmlGrid = document.getElementById("game-grid")
if (!htmlGrid) throw new Error("Grid is missing")

populateGrid(htmlGrid, rows, columns)

const grid = new Grid(rows, columns, htmlGrid)

const playButton = document.getElementById("play-button")
if (!playButton) throw new Error("Play button is missing")

let isRunning = false
const startGame = () => {
  if (isRunning) return

  const game = new Game(grid)
  game.render()

  const intervalCallback = () => {
    game.input("s")
  }

  const interval = new Interval(intervalCallback, 1000)

  const keydownHandler = (event: KeyboardEvent) => {
    const button = event.key
    game.input(button)

    if (button === "s")
      interval.reset()
    else if (button === "w")
      interval.pulse(500)
  }
  document.addEventListener("keydown", keydownHandler)

  hideComponent(playButton)
  isRunning = true
}

playButton.addEventListener('click', startGame)
document.addEventListener('keydown', (event) => {
  const button = event.key.toLowerCase()

  if (button === 'v') startGame()
})