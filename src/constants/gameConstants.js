export const WIN_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export const CELL_CENTERS = [
  { x: 65, y: 65 }, { x: 195, y: 65 }, { x: 325, y: 65 },
  { x: 65, y: 195 }, { x: 195, y: 195 }, { x: 325, y: 195 },
  { x: 65, y: 325 }, { x: 195, y: 325 }, { x: 325, y: 325 }
];