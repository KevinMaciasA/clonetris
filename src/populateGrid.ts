export default function populateGrid(grid: HTMLElement) {
  const columns = 10
  const rows = 20

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const div = document.createElement("div")
      div.classList.add("grid-item")
      div.id = `${j}-${i}`
      // div.innerText = `${j}-${i}` x-y
      grid.appendChild(div)
    }
  }
}