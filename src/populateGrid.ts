export default function populateGrid(grid: HTMLElement) {
  const columns = 10
  const rows = 20

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const div = document.createElement("div")
      div.classList.add("grid-item")
      div.id = `${i}-${j}`
      // div.innerText = `${i}-${j}`
      grid.appendChild(div)
    }
  }
}