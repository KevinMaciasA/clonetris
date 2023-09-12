import Point from "./Point"

export type ColorName = "Transparent"
  | "Default"
  | "Green"
  | "Yellow"
  | "Blue"
  | "Pink"
  | "Mint"
  | "Turquoise"
  | "Violet"
  | "Crimson"
  | "Rice"
  | "White"
  | "Black";

export function colorPoint(color: ColorName, point: Point) {
  const hexMap = new Map<ColorName, string>([
    ["Default", "#3a3a3a"],
    ["Green", "#45d900"],
    ["Yellow", "#ffc800"],
    ["Pink", "#f40167"],
    ["Blue", "#499eff"],
    ["Mint", "#00f241"],
    ["Turquoise", "#1ce9b5"],
    ["Violet", "#df41fb"],
    ["Crimson", "#f50056"],
    ["Rice", "#ede7e7"],
    ["White", "#f8f8ff"],
    ["Black", "#2b2b2b"]
  ])

  const p = document.getElementById(`${point.x}-${point.y}`)
  if (!p) return

  const customColor = hexMap.get(color)
  p.style.backgroundColor = customColor ?? color
}