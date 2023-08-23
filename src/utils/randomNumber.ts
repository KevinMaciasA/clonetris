export function randomNumber(min: number, max: number) {
  const randomDecimal = Math.random();
  const rangeLength = max - min + 1; // +1 to include the maximum value
  const randomNumberInRange = Math.floor(min + randomDecimal * rangeLength);
  return randomNumberInRange;
}