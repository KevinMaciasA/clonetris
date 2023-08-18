import Point from "./Point"

//TODO: Add all posible colors as enum

function colorPoint(color: string, point: Point) {
  const p = document.getElementById(`${point.y}-${point.x}`)
  if (!p) return

  p.style.backgroundColor = color;
}

export default colorPoint