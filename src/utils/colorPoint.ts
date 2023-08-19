import Point from "./Point"

export type ColorName = "RoyalBlue"
  | "Crimson"
  | "ForestGreen"
  | "Goldenrod"
  | "Teal"
  | "SlateGray"
  | "Indigo"
  | "Chocolate"
  | "Plum"
  | "White"
  | "Black";

export function colorPoint(color: ColorName, point: Point) {
  const p = document.getElementById(`${point.x}-${point.y}`)
  if (!p) return

  p.style.backgroundColor = color;
}