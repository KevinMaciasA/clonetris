import Game from './Game'
import Grid from './Grid'
import populateGrid from './populateGrid'
import './style.css'
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

  const keydownHandler = (event: KeyboardEvent) => {
    const button = event.key
    game.input(button)
  }
  document.addEventListener("keydown", keydownHandler)

  const intervalCallback = () => {
    game.input("s")
  }
  setInterval(intervalCallback, 1000)

  hideComponent(playButton)
  isRunning = true
}

playButton.addEventListener('click', startGame)
document.addEventListener('keydown', (event) => {
  const button = event.key.toLowerCase()

  if (button === 'v') startGame()
}) 