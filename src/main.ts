import populateGrid from './populateGrid'
import './style.css'

const grid = document.getElementById("game-grid")
if (!grid) console.error("Game grid is missing")
else populateGrid(grid)
