export default function populateGrid(grid: HTMLElement, rows: number, columns: number) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const div = document.createElement("div")
      div.classList.add("grid-item")
      div.dataset.isBlocked = "false"
      div.id = `${j}-${i}`
      // div.innerText = `${j}-${i}` x-y
      grid.appendChild(div)
    }
  }
}