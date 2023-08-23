import Point from "./Point"

export type AttributeName = "isBlocked"

export function addCustomAttr(attribute: AttributeName, value: any, point: Point) {
  const p = document.getElementById(`${point.x}-${point.y}`)
  if (!p) return

  p.dataset[attribute] = value;
}